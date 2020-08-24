import Head from 'next/head';
import { useRouter } from 'next/router';
import { getLocationTypes } from '../../lib/locationType';
import { getLocationsByTypeName } from '../../lib/location';
import utilStyles from '../../styles/utils.module.css';

import Search from '../../components/Search/Search';
//import Chart from '../../components/Chart/Chart';
import dynamic from 'next/dynamic';
// Cancel the SSR because leaflet doesn't support it 
const DynamicComponentWithNoSSR = dynamic(
	() => import('../../components/Chart/Chart'),
	{ ssr: false }
);

import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';

const Result = ({ locationsProp, locationTypesProp }) => {
	const router = useRouter();
	const locationTypeName = router.query.locationTypeName;

	const [searchField, setSearchField] = useState('');

	const [locations, setLocations] = useState(locationsProp);
	const [products, setProducts] = useState([]);
	const [productTypes, setProductTypes] = useState([]);

	const [searchedLocation, setSearchedLocation] = useState([]);
	const [searchedProduct, setSearchedProduct] = useState([]);
	const [searchedProductType, setSearchedProductType] = useState([]);

	const [searchLocation, setSearchLocation] = useState(false);
	const [searchProduct, setSearchProduct] = useState(false);
	const [searchProductType, setSearchProductType] = useState(false); 

	// Change the value of searchField state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchField(event.target.value.toLowerCase());
	};

	const getLocationType = () => {
		return locationTypesProp.filter(locationTypeProp => locationTypeProp.name === locationTypeName);
	}

	/**
	* Get the list of products that match to the user search
	* - If locationType = 'afficher tout' (locationType = undefined) so get all products
	* - setTimeout is used to avoid the error: Cannot update a component (`Result`) while rendering
	*   a different component (`Search`). To locate the bad setState() call inside `Search`
	*/ 
	const getProductsByLocationTypeId = () => {
		const [locationType] = getLocationType();
		const { data } = locationType
			? useSWR(`/api/product/${ locationType.id }`, fetcher)
			: useSWR(`/api/product`, fetcher); 
		data ? setTimeout(() => setProducts(data), 1000) : ''; 
		return data;
	};

	// Get the list of productType that match to the user search
	const getProductTypesByLocationTypeId = () => {
		const [locationType] = getLocationType();
		const { data } = locationType
			? useSWR(`/api/productType/${ locationType.id }`, fetcher)
			: useSWR(`/api/productType`, fetcher);
		data ? setTimeout(() => setProductTypes(data), 1000) : '';
		return data;
	};
	
	// Get the item (location, product, productType) searched by the user
	const getSearchedItem = event => {
		/**
		* If searchedLocation = [] all locations are displayed 
		* locations={ searchedLocation.length ? searchedLocation : locations } inside the
		* DynamicComponentWithNoSSR component below 
		*/
		const searchedLocation = locations.filter(location =>  location.name === event.target.value);
		/**                                                                   
		* searchedLocation should be an array with only one location.         
		* For the backoffice remember to add an uniq name per location    
		* e.g Yum-Yum - Mariste, Yum-Yum - Plateau instead of Yum-Yum, Yum-Yum  
		*/
		setSearchedLocation(searchedLocation);
		if (searchedLocation.length) {
			setSearchLocation(true);
		} else {
			const searchedProduct = products.filter(product => product.name === event.target.value);
			if (searchedProduct.length) {
				setSearchedProduct(searchedProduct);
				setSearchProduct(true);
			}
			
			const searchedProductType = productTypes.filter(productType => productType.name === event.target.value);
			if (searchedProductType.length) {
				setSearchedProductType(searchedProductType);
				setSearchProductType(true);
			}
		}
	};

	const setSearchLocationToFalse = () => {
		setSearchLocation(false);
	}

	/**
	* setTimeout is used to avoid the error: Cannot update a component (`Result`) while rendering
	* a different component (`Search`). To locate the bad setState() call inside `Search`
	*/ 
	const getLocationsByProductName = () => {
		const [product] = searchedProduct;
		const { data } = useSWR(`/api/location_product/${ product.name }`, fetcher);
		data ? setTimeout(() => setSearchedLocation(data), 500) : '';
		setTimeout(() => setSearchProduct(false), 1000);
	};

	const getLocationsByProductTypeName = () => {
		const [productType] = searchedProductType;
		const { data } = useSWR(`/api/location_productType/${ productType.name }`, fetcher);
		data ? setTimeout(() => setSearchedLocation(data), 500) : '';
		setTimeout(() => setSearchProductType(false), 1000);
	}

	return (
		<div>
			<Head>
				<title>{ locationTypeName }</title>
				<link 
					// require by leaflet 
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" 
					integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" 
					crossOrigin=""
				/>
			</Head>

			<Search 
				searchChange={ searchChange } 
				searchField={ searchField }
				locations={ locations }
				getLocationsByProductName={ getLocationsByProductName }
				getLocationsByProductTypeName={ getLocationsByProductTypeName }
				getProductsByLocationTypeId={ getProductsByLocationTypeId }
				getProductTypesByLocationTypeId={ getProductTypesByLocationTypeId }
				searchProduct={ searchProduct }
				searchProductType={ searchProductType }
				getSearchedItem={ getSearchedItem }
			/>
			<h1>{ locationTypeName }</h1>
			<DynamicComponentWithNoSSR 
				locations={ searchedLocation.length ? searchedLocation : locations }
				locationTypeName={ locationTypeName }
				searchLocation={ searchLocation }
				setSearchLocationToFalse={ setSearchLocationToFalse }
				locationTypes={ locationTypesProp }
			/>
		</div>
	);
};

export const getStaticPaths = async () => {
	try {
		const locationTypes = await getLocationTypes();
		let paths = locationTypes.map(locationType => ({
			params: { locationTypeName: locationType.name }
		}));

		// push "afficher-tout" because this param isn't dynamic 
		paths.push({ params: { locationTypeName: 'afficher-tout' }});
		return { 
			paths,
			fallback: false 
		};
	} catch(error) {
		console.log(error);
	}
}; 

export const getStaticProps = async ({ params }) => {
	try {
		const locations = await getLocationsByTypeName(params.locationTypeName);
		const locationTypes = await getLocationTypes();

		return {
			props: {
				locationsProp: locations,
				locationTypesProp: locationTypes
			},
			revalidate: 1
		}
	} catch (error) {
		console.log(error);
	}
};

export default Result;
