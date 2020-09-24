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

import LocationTypeList from '../../components/LocationType/LocationTypeList';
import TownList from '../../components/Town/TownList';

import { useState, useEffect, useRef } from 'react';


const Result = ({ locationsProp, locationTypesProp, townProp, townsProp }) => {
	const router = useRouter(); 
	const inputRef = useRef(null);
	
	const [paramTownName, paramLocationTypeName] = router.query.param;
	const [townName, setTownName] = useState(paramTownName);
	const [locationTypeName, setLocationTypeName] = useState(paramLocationTypeName);
	const [remountChartComponent, setRemountChartComponent] = useState(false);

	const [locationType, setLocationType] = useState('');
	
	const [searchFieldValue, setSearchFieldValue] = useState('');

	const [locations, setLocations] = useState(locationsProp);
	const [searchedLocations, setSearchedLocations] = useState([]);

	const [products, setProducts] = useState([]);
	const [productTypes, setProductTypes] = useState([]);
	const [districts, setDistricts] = useState([]);

	const [searchedLocation, setSearchedLocation] = useState([]);
	const [searchedProduct, setSearchedProduct] = useState([]);
	const [searchedProductType, setSearchedProductType] = useState([]);
	const [searchedDistrict, setSearchedDistrict] = useState([]);

	const [locationSearch, setLocationSearch] = useState(false);
	const [productSearch, setProductSearch] = useState(false);
	const [productTypeSearch, setProductTypeSearch] = useState(false); 
	const [districtSearch, setDistrictSearch] = useState(false);

	const [savedSearchedLocations, setSavedSearchedLocations] = useState([]);
	const [savedSearchedLocation, setSavedSearchedLocation] = useState([]);
	const [savedSearchedDistrict, setSavedSearchedDistrict] = useState([]);
	const [savedSearchedProduct, setSavedSearchedProduct] = useState([]);
	const [savedSearchedProductType, setSavedSearchedProductType] = useState([]);
	

	useEffect(() => {
		const savedSearchFieldValue = localStorage.getItem('savedSearchFieldValue');
		const parsedSavedSearch = JSON.parse(localStorage.getItem('savedSearch'));
		if (savedSearchFieldValue && parsedSavedSearch && parsedSavedSearch.townName === townName && parsedSavedSearch.locationTypeName === locationTypeName) {
			// Search Component input ref 
			inputRef.current.value = savedSearchFieldValue;
			setSavedSearchedLocations(parsedSavedSearch.searchedLocations);
			if (parsedSavedSearch.type === 'product') {
				setSavedSearchedProduct(parsedSavedSearch.searchedItem);
				setProductSearch(true);
			} else if (parsedSavedSearch.type === 'productType') {
				setSavedSearchedProductType(parsedSavedSearch.searchedItem);
				setProductTypeSearch(true);
			} else if (parsedSavedSearch.type === 'location') {
				setSavedSearchedLocation(parsedSavedSearch.searchedItem);
				setLocationSearch(true);
			} else if (parsedSavedSearch.type === 'district') {
				setSavedSearchedDistrict(parsedSavedSearch.searchedItem);
				setDistrictSearch(true);
			}		
		} else {
			resetSavedSearch();
		}
	}, []);

	useEffect(() => getSearchedItem(), [searchFieldValue]);

	useEffect(() => setSearchedLocations(savedSearchedLocations), [savedSearchedLocations]);
	useEffect(() => setSearchedLocation(savedSearchedLocation), [savedSearchedLocation]);
	useEffect(() => setSearchedDistrict(savedSearchedDistrict), [savedSearchedDistrict]);
	useEffect(() => setSearchedProduct(savedSearchedProduct), [savedSearchedProduct]);
	useEffect(() => setSearchedProductType(savedSearchedProductType), [savedSearchedProductType]);
	
	useEffect(() => {
		const savedSearchFieldValue = localStorage.getItem('savedSearchFieldValue');
		const parsedSavedSearch = JSON.parse(localStorage.getItem('savedSearch'));
		if (savedSearchFieldValue && parsedSavedSearch && (parsedSavedSearch.townName !== paramTownName || parsedSavedSearch.locationTypeName !== paramLocationTypeName)) {
			resetSavedSearch('cleanSearchField');
		}

		setTownName(paramTownName);
		setLocationTypeName(paramLocationTypeName);
		setLocations(locationsProp);
		setRemountChartComponent(!remountChartComponent);
	}, [paramTownName, paramLocationTypeName, locationsProp]);

	useEffect(() => {
		getLocationType();
	}, [locationTypeName]);

	// Change the value of searchFieldValue state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchFieldValue(event.target.value.toLowerCase());

		// Reset saved search when the user does a new search
		const savedSearchFieldValue = localStorage.getItem('savedSearchFieldValue');
		const savedSearch = localStorage.getItem('savedSearch');
		if (savedSearchFieldValue && savedSearch) {
			resetSavedSearch();
		}
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
		setSearchedLocations(locations)
	};

	// Save search field value in the localSorage
	const saveSearchFieldValue = () => {
		localStorage.setItem('savedSearchFieldValue', searchFieldValue);
	};

	// Save all data about search in the localStorage
	const saveSearch = (searchedLocations, type, searchedItem=[]) => {
		localStorage.setItem('savedSearch', JSON.stringify({ 
			searchedLocations, //The locations that contain the searched item
			searchedItem: searchedItem.length ? searchedItem : searchedLocations,
			type, 
			townName,
			locationTypeName
		}));
	};

	// Reset all data about search from the localStorage
	const resetSavedSearch = (action=null) => {
		
		if (action === 'cleanSearchField') {
			inputRef.current.value = '';
        	setSearchFieldValue(null);
		}

		localStorage.removeItem('savedSearchFieldValue');
		localStorage.removeItem('savedSearch');
		setSearchedLocations([]);  
		if (savedSearchedLocations.length) setSavedSearchedLocations([]);
        if (productSearch) {
        	setSearchedProduct([]);
        	setProductSearch(false);
        	if (savedSearchedProduct.length) setSavedSearchedProduct([]);
        } else if (productTypeSearch) {
        	setSearchedProductType([]);
        	setProductTypeSearch(false);
        	if (savedSearchedProductType.length) setSavedSearchedProductType([]); 
        } else if (locationSearch) {
        	setSearchedLocation([]);
        	setLocationSearch(false);
        	if (savedSearchedLocation.length) setSavedSearchedLocation([]);
        } else if (districtSearch) {
        	setSearchedDistrict([]);
        	setDistrictSearch(false);
        	if (savedSearchedDistrict.length) setSavedSearchedDistrict([]); 
        } 
	};
	
	// Get the item (location, product, productType, district) searched by the user
	const getSearchedItem = () => {
		if (searchFieldValue) {
			/**
			* If searchedLocations = [] all locations are displayed 
			* locations={ searchedLocations.length ? searchedLocations : locations } inside the
			* DynamicComponentWithNoSSR component below 
			*/
			const searchedLocation = locations.filter(location =>  location.name === searchFieldValue);
			/**                                                                   
			* searchedLocations should be an array with only one location.         
			* For the backoffice remember to add an uniq name per location    
			* e.g Yum-Yum - Mariste, Yum-Yum - Plateau instead of Yum-Yum, Yum-Yum  
			*/
			if (searchedLocation.length) {
				setSearchedLocation(searchedLocation);
				setLocationSearch(true);
				saveSearchFieldValue();
			} 

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

	const selectTownName = event => {
		localStorage.setItem('townName', event.target.value);
    	router.push('/result/[...param]', `/result/${ event.target.value }/${ locationTypeName }`);
  	}

  	const selectLocationType = event => {
    	router.push('/result/[...param]', `/result/${ townName }/${ event.target.value }`);
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
				inputRef={ inputRef }
				resetSavedSearch={ resetSavedSearch }
				savedSearchedDistrict={ savedSearchedDistrict } 

				locationType={ locationType }
				locationTypeName={ locationTypeName }
				townName={ townName }	

				locations={ locations }
				searchChange={ searchChange } 
				searchFieldValue={ searchFieldValue }

				getProducts={ getProducts }
				getProductTypes={ getProductTypes }
				getDistricts={ getDistricts }
			/>
			<div className="flex mt4 mb1">
				<TownList
			    	towns={ townsProp }
			        selectTownName={ selectTownName }
			        townName={ townName }
			    />
			    <LocationTypeList
	              	locationTypes={ locationTypesProp }
	              	townName={ townName }
	              	locationTypeName={ locationTypeName }
	              	selectLocationType={ selectLocationType }
	            />
            </div>
			<DynamicComponentWithNoSSR 
				key={ remountChartComponent }
				townProp={ townProp }
				townName={ townName }
				searchFieldValue={ searchFieldValue }

				locationTypes={ locationTypesProp }
				locationTypeName={ locationTypeName }
				locations={ searchedLocations.length ? searchedLocations : locations }
                locationType={ locationType }
                getSearchedLocations={ getSearchedLocations }

				locationSearch={ locationSearch }
				searchedLocationProp={ searchedLocation }
				
				districtSearch={ districtSearch }
				searchedDistrictProp={ searchedDistrict }

				productSearch={ productSearch }
				searchedProduct={ searchedProduct }

				productTypeSearch={ productTypeSearch }
				searchedProductType={ searchedProductType }
			
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
	    		paths.push({ params: { param: [town.name, locationType.name] }});
	    	});
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
		const towns = await getTowns();

		return {
			props: {
				locationsProp: locations,
				locationTypesProp: locationTypes, 
				townProp: town,
				townsProp: towns
			},
			revalidate: 1
		}
	} catch (error) {
		console.log(error);
	}
};

export default Result;