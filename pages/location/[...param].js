import Head from 'next/head';

import { getLocations, getLocationByNameAndTownName } from '../../lib/location';
import { getTowns } from '../../lib/town'; 

const Location = ({ locationProp }) => {
	console.log(locationProp);
	return (
		<div>
			<Head>
				<title>{ locationProp.name }</title>
			</Head>
			
			<h1>{ locationProp.name }</h1>
		</div>
	);
};

export const getStaticPaths = async () => {
	try {
		const locations = await getLocations(); 
		const towns = await getTowns(); 

		let paths = [];
		towns.forEach(town => {
			locations.forEach(location => {
				paths.push({ params: { param: [location.name, town.name] }});
			});
		});

		return {
			paths, 
			fallback: false
		};
	} catch (error) {
		console.log(error);
	}
};

export const getStaticProps = async ({ params }) => {
	const [locationName, townName] = params.param;
	try {
		const [location] = await getLocationByNameAndTownName(locationName, townName);
		
		return {
			props: {
				locationProp: location
			}
		};
	} catch (error) {
		console.log(error)
	}
};

export default Location;