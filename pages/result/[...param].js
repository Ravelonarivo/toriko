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

import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';


const Result = ({ locationsProp, locationTypesProp, townProp }) => {
	const router = useRouter(); 
	const inputRef = useRef(null);
	const [townName, locationTypeName] = router.query.param;
	const [locationType, setLocationType] = useState('');

	const [searchFieldValue, setSearchFieldValue] = useState('');

	const [locations] = useState(locationsProp);
	const [products, setProducts] = useState([]);
	const [productTypes, setProductTypes] = useState([]);
	const [districts, setDistricts] = useState([]);

	const [searchedLocations, setSearchedLocations] = useState([]);
	const [searchedProduct, setSearchedProduct] = useState([]);
	const [searchedProductType, setSearchedProductType] = useState([]);
	const [searchedDistrict, setSearchedDistrict] = useState([]);

	const [locationSearch, setLocationSearch] = useState(false);
	const [productSearch, setProductSearch] = useState(false);
	const [productTypeSearch, setProductTypeSearch] = useState(false); 
	const [districtSearch, setDistrictSearch] = useState(false);

	const [savedSearch, setSavedSearch] = useState([]);
	const [savedSearchedDistrict, setSavedSearchedDistrict] = useState([]);
	

	useEffect(() => {
		getLocationType();

		const savedSearchFieldValue = localStorage.getItem('savedSearchFieldValue');
		const parsedSavedSearch = JSON.parse(localStorage.getItem('savedSearch'));
		if (savedSearchFieldValue && parsedSavedSearch && parsedSavedSearch.townName === townName && parsedSavedSearch.locationTypeName === locationTypeName) {
			// Search Component input ref 
			inputRef.current.value = savedSearchFieldValue;
			setSavedSearch(parsedSavedSearch.locations);
			if (parsedSavedSearch.type === 'location') {
				setLocationSearch(true);
			} else if (parsedSavedSearch.type === 'district') {
				setSavedSearchedDistrict(parsedSavedSearch.searchedDistrict);
				setDistrictSearch(true);
			}		
		} else {
			resetSavedSearch();
		}
	}, []);

	useEffect(() => getSearchedItem(), [searchFieldValue]);
	useEffect(() => setSearchedLocations(savedSearch), [savedSearch]);
	useEffect(() => setSearchedDistrict(savedSearchedDistrict), [savedSearchedDistrict])

	// Change the value of searchFieldValue state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchFieldValue(event.target.value.toLowerCase());
	};
	
	const getLocationType = () => {
		const [locationType] = locationTypesProp.filter(locationTypeProp => locationTypeProp.name === locationTypeName);
		setLocationType(locationType);
	};

	const getProducts = products => {
		setProducts(products);
	}; 

	const getProductTypes = productTypes => {
		setProductTypes(productTypes);
	};

	const getDistricts = districts => {
		setDistricts(districts);
	};

	const getSearchedLocations = locations => {
		setSearchedLocations(locations);
	}

	// Save ssearch field value in the localSorage
	const saveSearchFieldValue = () => {
		localStorage.setItem('savedSearchFieldValue', searchFieldValue);
	};

	// Save all data about search in the localStorage
	const saveSearch = (searchedLocations, type, searchedDistrict = []) => {
		localStorage.setItem('savedSearch', JSON.stringify({ 
			locations: searchedLocations,
			type, 
			searchedDistrict,
			townName,
			locationTypeName
		}));
	}

	// Reset all data about search from the localStorage
	const resetSavedSearch = () => {
		localStorage.removeItem('savedSearchFieldValue');
		localStorage.removeItem('savedSearch');
		inputRef.current.value = '';
        setSearchFieldValue(null);
        setSavedSearch([]);
        if (savedSearchedDistrict.length) {
        	setSavedSearchedDistrict([]);
        	setSearchedDistrict([]);
        }
	}
	
	// Get the item (location, product, productType) searched by the user
	const getSearchedItem = () => {
		/**
		* If searchedLocations = [] all locations are displayed 
		* locations={ searchedLocations.length ? searchedLocations : locations } inside the
		* DynamicComponentWithNoSSR component below 
		*/
		const searchedLocations = locations.filter(location =>  location.name === searchFieldValue);
		/**                                                                   
		* searchedLocations should be an array with only one location.         
		* For the backoffice remember to add an uniq name per location    
		* e.g Yum-Yum - Mariste, Yum-Yum - Plateau instead of Yum-Yum, Yum-Yum  
		*/
		setSearchedLocations(searchedLocations);
		if (searchedLocations.length) {
			setLocationSearch(true);
			saveSearchFieldValue();
			saveSearch(searchedLocations, 'location');
		} else {
			const searchedProduct = products.filter(product => product.name === searchFieldValue);
			if (searchedProduct.length) {
				setSearchedProduct(searchedProduct);
				setProductSearch(true);
				saveSearchFieldValue();
			}
			
			const searchedProductType = productTypes.filter(productType => productType.name === searchFieldValue);
			if (searchedProductType.length) {
				setSearchedProductType(searchedProductType);
				setProductTypeSearch(true);
				saveSearchFieldValue();
			}

			const searchedDistrict = districts.filter(district => district.name === searchFieldValue);
			if (searchedDistrict.length) {
				setSearchedDistrict(searchedDistrict)
				setDistrictSearch(true);
				saveSearchFieldValue();
			}
		}
	};

	const setLocationSearchToFalse = () => {
		setLocationSearch(false);
	};

	const setDistrictSearchToFalse = () => {
		setDistrictSearch(false);
	};

	const setProductSearchToFalse = () => {
		setProductSearch(false);
	};

	const setProductTypeSearchToFalse = () => {
		setProductTypeSearch(false);
	};

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
				inputRef={ inputRef }
				resetSavedSearch={ resetSavedSearch }
				savedSearchedDistrict={ savedSearchedDistrict } 

				locationType={ locationType }
				townName={ townName }	

				locations={ locations }
				searchChange={ searchChange } 
				searchFieldValue={ searchFieldValue }

				
				getProducts={ getProducts }
				getProductTypes={ getProductTypes }
				getDistricts={ getDistricts }
			/>
			<h1>{ townName }/{ locationTypeName }</h1>
			<DynamicComponentWithNoSSR 
				townProp={ townProp }
				townName={ townName }
				searchFieldValue={ searchFieldValue }

				locationTypes={ locationTypesProp }
				locationTypeName={ locationTypeName }
				locations={ searchedLocations.length || savedSearch.length ? searchedLocations : locations }
                locationType={ locationType }
                getSearchedLocations={ getSearchedLocations }

				locationSearch={ locationSearch }
				setLocationSearchToFalse={ setLocationSearchToFalse }
				
				districtSearch={ districtSearch }
				searchedDistrictProp={ searchedDistrict }
				setDistrictSearchToFalse={ setDistrictSearchToFalse }

				productSearch={ productSearch }
				searchedProduct={ searchedProduct }
				setProductSearchToFalse={ setProductSearchToFalse }

				productTypeSearch={ productTypeSearch }
				searchedProductType={ searchedProductType }
				setProductTypeSearchToFalse={ setProductTypeSearchToFalse }
			
				saveSearch={ saveSearch }
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