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

const Result = ({ locationsProp }) => {
	const router = useRouter();
	const locationsType = router.query.type;

	const [locations, setLocations] = useState(locationsProp);
	const [searchField, setSearchField] = useState('');
	const [searchedLocation, setSearchedLocation] = useState([]);
	const [search, setSearch] = useState(false);
	
	// Change the value of searchField state when the user tapes words on the Search component
	const searchChange = event => {
		setSearchField(event.target.value);
	};

	// Get the list of locations that match to the user search 
	const filteredLocations = locations.filter(location => {
		return location.name.toLowerCase().includes(searchField.toLowerCase());
	});
	
	// Get the location searched by the user
	const getSearchedLocation = event => {
		/**                                                                   
		* searchedLocation should be an array with only one location.         
		* For the backoffice remember to add an uniq name per location    
		* e.g Yum-Yum - Mariste, Yum-Yum - Plateau instead of Yum-Yum, Yum-Yum  
		*/
		const searchedLocation = filteredLocations.filter(location =>  location.name.toLowerCase() === event.target.value.toLowerCase())
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
				filteredLocations={ filteredLocations }
				getSearchedLocation={ getSearchedLocation }
			/>
			<h1>{ locationsType }</h1>
			<DynamicComponentWithNoSSR 
				locations={ searchedLocation.length ? searchedLocation : locations }
				locationsType={ locationsType }
				search={ search }
				setSearchStateToFalse={ setSearchStateToFalse }
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

export const getStaticProps = ({ params }) => {
	return getLocationsByType(params.type)
		.then(locations => ({ props: { locationsProp: locations }}))
		.catch(error => console.log(error));
};

export default Result;
