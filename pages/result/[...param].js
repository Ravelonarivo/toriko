import Head from 'next/head';
import { useRouter } from 'next/router';
import { getLocationTypes, getLocationsByTownNameAndTypeName } from '../../lib/location';
import { getTowns, getTownByName } from '../../lib/town';
import utilStyles from '../../styles/utils.module.css';

import Search from '../../components/Search/Search';
//import Chart from '../../components/Chart/Chart';
import dynamic from 'next/dynamic';
// Cancel the SSR because leaflet doesn't support it 
const DynamicComponentWithNoSSR = dynamic(
	() => import('../../components/Chart/Chart'),
	{ ssr: false }
);

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';


const Result = ({ locationsProp, locationTypesProp, townProp }) => {
	const router = useRouter(); 
	const [townName, locationTypeName] = router.query.param;

	const [searchField, setSearchField] = useState('');

	const [locations, setLocations] = useState(locationsProp);
	const [products, setProducts] = useState([]);
	const [productTypes, setProductTypes] = useState([]);
	const [specialities, setSpecialities] = useState([]);
	const [districts, setDistricts] = useState([]);

	const [searchedLocations, setSearchedLocations] = useState([]);
	const [searchedProduct, setSearchedProduct] = useState([]);
	const [searchedProductType, setSearchedProductType] = useState([]);
	const [searchedDistrict, setSearchedDistrict] = useState([]);

	const [searchLocation, setSearchLocation] = useState(false);
	const [searchProduct, setSearchProduct] = useState(false);
	const [searchProductType, setSearchProductType] = useState(false); 
	const [searchDistrict, setSearchDistrict] = useState(false);


	// Change the value of searchField state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchField(event.target.value.toLowerCase());
	};

	const getLocationType = () => {
		return locationTypesProp.filter(locationTypeProp => locationTypeProp.name === locationTypeName);
	}

	const getLocationIds = () => {
		return searchedLocations.length
			? searchedLocations.map(searchedLocation => searchedLocation.id)
			: locations.map(location => location.id);
	}

	/**
	* - If locationType = 'afficher tout' locationType = undefined, so get all products
	* - The first value return by SWR is undefined, so need to check the variable data before use it
	* - setTimeout is used to avoid the error: Cannot update a component (`Result`) while rendering
	*   a different component (`Search`). To locate the bad setState() call inside `Search`
	*/ 

	//Get the list of products that match to the user search
	const getProductsByLocationTypeIdAndTownName = () => {
		const [locationType] = getLocationType();
		const { data } = locationType
			? useSWR(`/api/product_locationType_town/${ locationType.id }/${ townName }`, fetcher)
			: useSWR(`/api/product_locationType_town/${ townName }`, fetcher); 
		data ? setTimeout(() => setProducts(data), 5) : ''; 
		return data;
	};

	// Get the list of productTypes that match to the user search
	const getProductTypesByLocationTypeIdAndTownName = () => {
		const [locationType] = getLocationType();
		const { data } = locationType
			? useSWR(`/api/productType_locationType_town/${ locationType.id }/${ townName }`, fetcher)
			: useSWR(`/api/productType_locationType_town/${ townName }`, fetcher);
		data ? setTimeout(() => setProductTypes(data), 5) : '';
		return data;
	};

	// Get the list of districts that match to the user search 
	const getDistrictsByLocationTypeIdAndTownName = () => {
		const [locationType] = getLocationType();
		const { data } = locationType
			? useSWR(`/api/district_locationType_town/${ locationType.id }/${ townName }`, fetcher)
			: useSWR(`/api/district_locationType_town/${ townName }`, fetcher);
		data ? setTimeout(() => setDistricts(data), 5) : '';
		return data;
	}

	// Get the list of locations speciality 
	const getSpecialitiesByLocationIds = () => {
		// stringify the result of getLocationIds because it's an array of ids
		const locationIds = JSON.stringify(getLocationIds());
		const { data } = useSWR(`/api/speciality_location/${ locationIds }`, fetcher); 
		data ? setTimeout(() => setSpecialities(data), 5) : '';
	};
	
	// Get the item (location, product, productType) searched by the user
	const getSearchedItem = () => {
		/**
		* If searchedLocations = [] all locations are displayed 
		* locations={ searchedLocations.length ? searchedLocations : locations } inside the
		* DynamicComponentWithNoSSR component below 
		*/
		const searchedLocations = locations.filter(location =>  location.name === searchField);
		/**                                                                   
		* searchedLocations should be an array with only one location.         
		* For the backoffice remember to add an uniq name per location    
		* e.g Yum-Yum - Mariste, Yum-Yum - Plateau instead of Yum-Yum, Yum-Yum  
		*/
		setSearchedLocations(searchedLocations);
		if (searchedLocations.length) {
			setSearchLocation(true);
		} else {
			const searchedProduct = products.filter(product => product.name === searchField);
			if (searchedProduct.length) {
				setSearchedProduct(searchedProduct);
				setSearchProduct(true);
			}
			
			const searchedProductType = productTypes.filter(productType => productType.name === searchField);
			if (searchedProductType.length) {
				setSearchedProductType(searchedProductType);
				setSearchProductType(true);
			}

			const searchedDistrict = districts.filter(district => district.name === searchField);
			if (searchedDistrict.length) {
				setSearchedDistrict(searchedDistrict)
				setSearchDistrict(true);
			}
		}
	};

	const setSearchLocationToFalse = () => {
		setSearchLocation(false);
	}

	const setSearchDistrictToFalse = () => {
		setSearchDistrict(false);
	}

	/**
	* setTimeout is used to avoid the error: Cannot update a component (`Result`) while rendering
	* a different component (`Search`). To locate the bad setState() call inside `Search`
	*/ 
	const getLocationsByProductNameAndTownName = () => {
		const [product] = searchedProduct;
		const { data } = useSWR(`/api/location_product_town/${ product.name }/${ townName }`, fetcher);
		if (data) {
			setTimeout(() => {
				setSearchedLocations(data);
				setSearchProduct(false);
			}, 5)
		}
	};

	const getLocationsByProductTypeNameAndTownName = () => {
		const [productType] = searchedProductType;
		const { data } = useSWR(`/api/location_productType_town/${ productType.name }/${ townName }`, fetcher);
		if (data) {
			setTimeout(() => {
				setSearchedLocations(data);
				setSearchProductType(false);
			}, 5)
		}
	}

	const getLocationsByDistrictIdAndLocationTypeId = () => {
		const [district] = searchedDistrict;
		const [locationType] = getLocationType();
		const { data } = locationType 
			? useSWR(`/api/location_district_locationType/${ district.id }/${locationType.id}`, fetcher)
			: useSWR(`/api/location_district_locationType/${ district.id }`, fetcher);
		if (data) {
			setTimeout(() => {
				setSearchedLocations(data);
			}, 5)
		}
	}

	useEffect(() => {
		getSearchedItem();
	}, [searchField])

	getSpecialitiesByLocationIds();

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
				locations={ locations }
				searchChange={ searchChange } 
				searchField={ searchField }

				searchProduct={ searchProduct }
				getProductsByLocationTypeIdAndTownName={ getProductsByLocationTypeIdAndTownName }
				getLocationsByProductNameAndTownName={ getLocationsByProductNameAndTownName }
				
				searchProductType={ searchProductType }
				getProductTypesByLocationTypeIdAndTownName={ getProductTypesByLocationTypeIdAndTownName }
				getLocationsByProductTypeNameAndTownName={ getLocationsByProductTypeNameAndTownName }
				
				searchDistrict={ searchDistrict }
				getDistrictsByLocationTypeIdAndTownName={ getDistrictsByLocationTypeIdAndTownName }
				getLocationsByDistrictIdAndLocationTypeId={ getLocationsByDistrictIdAndLocationTypeId }
			/>
			<h1>{ townName }/{ locationTypeName }</h1>
			<DynamicComponentWithNoSSR 
				town={ townProp }

				locationTypes={ locationTypesProp }
				locationTypeName={ locationTypeName }
				locations={ searchedLocations.length ? searchedLocations : locations }

				searchLocation={ searchLocation }
				setSearchLocationToFalse={ setSearchLocationToFalse }
				
				searchDistrict={ searchDistrict }
				searchedDistrict={ searchedDistrict }
				setSearchDistrictToFalse={ setSearchDistrictToFalse }
				
				specialities={ specialities }
			/>
		</div>
	);
};

export const getStaticPaths = async () => {
	try {
		const locationTypes = await getLocationTypes();
		const towns = await getTowns();

	    let paths = [];
	    towns.forEach(town => {
	    	locationTypes.forEach(locationType => {
	    		paths.push({ params: { param: [town.name, locationType.name] }})
	    	})
	    });

		towns.forEach(town => {
			paths.push({ params: { param: [town.name, 'afficher-tout'] }});
		});
		
		return { 
			paths,
			fallback: false 
		};
	} catch(error) {
		console.log(error);
	}
}; 

export const getStaticProps = async ({ params }) => {

	const [townName, locationTypeName] = params.param;
	try {
		const locations = await getLocationsByTownNameAndTypeName(townName, locationTypeName);
		const locationTypes = await getLocationTypes();
		const town = await getTownByName(townName);

		return {
			props: {
				locationsProp: locations,
				locationTypesProp: locationTypes, 
				townProp: town
			},
			revalidate: 1
		}
	} catch (error) {
		console.log(error);
	}
};

export default Result;