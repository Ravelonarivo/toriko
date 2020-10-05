import Head from 'next/head';

import LocationPresentation from '../../components/LocationPresentation/LocationPresentation';
import Menu from '../../components/Menu/Menu';

import { getLocations, getLocationBySlugAndTownName, getOpeningsByLocationSlugAndTownName, getPicturesByLocationSlugAndTownName  } from '../../lib/location';
import { getTowns } from '../../lib/town'; 
import { getProductsByLocationId, getProductTypesByLocationId } from '../../lib/product';

const Presentation = ({ locationProp, openingsProp, picturesProp, productsProp, productTypesProp }) => {
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

			<Menu
				products={ productsProp }
				productTypes={ productTypesProp }
				location={ locationProp }
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
		const products = await getProductsByLocationId(location.id);
		const productTypes = await getProductTypesByLocationId(location.id);

		return {
			props: {
				locationProp: location,
				openingsProp: openings,
				picturesProp: pictures,
				productsProp: products,
				productTypesProp: productTypes
			}, 
			revalidate: 1
		};
	} catch (error) {
		console.log(error)
	}
};

export default Presentation;