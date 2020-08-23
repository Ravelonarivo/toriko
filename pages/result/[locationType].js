import Head from 'next/head';
import { useRouter } from 'next/router';
import { getLocationTypes } from '../../lib/locationType';
import { getLocationsByType } from '../../lib/location';
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
	const locationType = router.query.locationType;

	const [searchField, setSearchField] = useState('');
	const [locations, setLocations] = useState(locationsProp);
	const [products, setProducts] = useState([]);
	const [searchedLocation, setSearchedLocation] = useState([]);
	const [searchedProduct, setSearchedProduct] = useState([]);
	const [searchLocation, setSearchLocation] = useState(false);
	const [searchProduct, setSearchProduct] = useState(false);

	// Change the value of searchField state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchField(event.target.value.toLowerCase());
	};

	/**
	* Get the list of products that match to the user search
	* - If locationType = 'afficher tout' (locType = undefined) so get all products
	* - setTimeout is used to avoid the error: Cannot update a component (`Result`) while rendering
	*   a different component (`Search`). To locate the bad setState() call inside `Search`
	*/ 
	const getProductsByLocationType = () => {
		const [locType] = locationTypesProp.filter(locationType => locationType.name === locationType);
		const { data } = locType
			? useSWR(`/api/product/${ locType.id }`, fetcher)
			: useSWR(`/api/product`, fetcher); 
		data ? setTimeout(() => setProducts(data), 1000) : ''; 
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
			if (products.length) {
				const searchedProduct = products.filter(product => product.name === event.target.value);
				if (searchedProduct.length) {
					setSearchedProduct(searchedProduct);
					setSearchProduct(true);
				}
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
		const { data } = useSWR(`/api/location/${ product.name }`, fetcher);
		data ? setTimeout(() => setSearchedLocation(data), 500) : '';
		setTimeout(() => setSearchProduct(false), 1000);
	};

	return (
		<div>
			<Head>
				<title>{ locationType }</title>
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
				getProductsByLocationType={ getProductsByLocationType }
				getLocationsByProductName={ getLocationsByProductName }
				searchProduct={ searchProduct }
				getSearchedItem={ getSearchedItem }
			/>
			<h1>{ locationType }</h1>
			<DynamicComponentWithNoSSR 
				locations={ searchedLocation.length ? searchedLocation : locations }
				locationType={ locationType }
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
		let paths = locationTypes.map(type => ({
			params: { locationType: type.name }
		}));

		// push "afficher-tout" because this param isn't dynamic 
		paths.push({ params: { locationType: 'afficher-tout' }});
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
		const locations = await getLocationsByType(params.locationType);
		const types = await getLocationTypes();

		return {
			props: {
				locationsProp: locations,
				locationTypesProp: types
			},
			revalidate: 1
		}
	} catch (error) {
		console.log(error);
	}
};

export default Result;
