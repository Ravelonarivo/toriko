import Head from 'next/head';
import { useRouter } from 'next/router';
import { getLocationTypes } from '../../lib/type';
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

const Result = ({ locationsProp, typesProp }) => {
	const router = useRouter();
	const locationsType = router.query.type;

	const [locations, setLocations] = useState(locationsProp);
	const [searchField, setSearchField] = useState('');
	const [searchedLocation, setSearchedLocation] = useState([]);
	const [search, setSearch] = useState(false);

	// Change the value of searchField state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchField(event.target.value.toLowerCase());
	};

	// Get the list of locations that match to the user search 
	/*const getFilteredLocations = () => {
		const { data } = useSWR(`/api/location/${ searchField  }/${ locationsType }`, fetcher);
		return data;
		// CHANGE IT TO SELECT * FROM LOCATION WHERE LOCATION_TYPE ...
	};*/
	
	// Get the location searched by the user
	const getSearchedLocation = event => {
		/**                                                                   
		* searchedLocation should be an array with only one location.         
		* For the backoffice remember to add an uniq name per location    
		* e.g Yum-Yum - Mariste, Yum-Yum - Plateau instead of Yum-Yum, Yum-Yum  
		*/
		const searchedLocation = locations.filter(location =>  location.name === event.target.value);
		setSearchedLocation(searchedLocation);
		if (searchedLocation.length) setSearch(true);
	};

	const setSearchStateToFalse = () => {
		setSearch(false);
	}

	return (
		<div>
			<Head>
				<title>{ locationsType }</title>
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
				//getFilteredLocations={ getFilteredLocations }
				getSearchedLocation={ getSearchedLocation }
			/>
			<h1>{ locationsType }</h1>
			<DynamicComponentWithNoSSR 
				locations={ searchedLocation.length ? searchedLocation : locations }
				locationsType={ locationsType }
				search={ search }
				setSearchStateToFalse={ setSearchStateToFalse }
				types={ typesProp }
			/>
		</div>
	);
};

export const getStaticPaths = async () => {
	try {
		const locationTypes = await getLocationTypes();
		let paths = locationTypes.map(type => ({
			params: { type: type.name }
		}));

		// push "afficher-tout" because this param isn't dynamic 
		paths.push({ params: { type: 'afficher-tout' }});
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
		const locations = await getLocationsByType(params.type);
		const types = await getLocationTypes();

		return {
			props: {
				locationsProp: locations,
				typesProp: types
			},
			revalidate: 1
		}
	} catch (error) {
		console.log(error);
	}
};

export default Result;
