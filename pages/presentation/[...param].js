import Head from 'next/head';

import LocationPresentation from '../../components/LocationPresentation/LocationPresentation';

import { getLocations, getLocationByNameAndTownName } from '../../lib/location';
import { getTowns } from '../../lib/town'; 



const Presentation = ({ locationProp }) => {
	console.log(locationProp);

	return (
		<div>
			<Head>
				<title>{ locationProp.name }</title>
			</Head>
			
			<LocationPresentation location={ locationProp } />
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
			}, 
			revalidate: 1
		};
	} catch (error) {
		console.log(error)
	}
};

export default Presentation;