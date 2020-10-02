import Head from 'next/head';

import LocationPresentation from '../../components/LocationPresentation/LocationPresentation';

import { getLocations, getLocationBySlugAndTownName, getOpeningsByLocationSlugAndTownName, getPicturesByLocationSlugAndTownName  } from '../../lib/location';
import { getTowns } from '../../lib/town'; 

const Presentation = ({ locationProp, openingsProp, picturesProp }) => {
	return (
		<div>
			<Head>
				<title>{ locationProp.name }</title>
			</Head>
			
			<LocationPresentation 
				location={ locationProp  } 
				openings={ openingsProp }
				pictures={ picturesProp }
			/>
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
				paths.push({ params: { param: [location.slug, town.name] }});
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
	const [locationSlug, townName] = params.param;
	try {
		const [location] = await getLocationBySlugAndTownName(locationSlug, townName);
		const openings = await getOpeningsByLocationSlugAndTownName(locationSlug, townName);
		const pictures = await getPicturesByLocationSlugAndTownName(locationSlug, townName);

		return {
			props: {
				locationProp: location,
				openingsProp: openings,
				picturesProp: pictures
			}, 
			revalidate: 1
		};
	} catch (error) {
		console.log(error)
	}
};

export default Presentation;