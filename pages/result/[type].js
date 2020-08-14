import Head from 'next/head';
import { useRouter } from 'next/router';
import { getLocationTypes } from '../../lib/type';
import { getLocationsByType } from '../../lib/location';
import utilStyles from '../../styles/utils.module.css';
//import Chart from '../../components/Chart/Chart';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
	() => import('../../components/Chart/Chart'),
	{ ssr: false }
);

const Result = ({ locations }) => {
	const router = useRouter();
	const locationsType = router.query.type;

	return (
		<div>
			<Head>
				<title>{ locationsType }</title>
				<link 
					rel="stylesheet" 
					href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" 
					integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" 
					crossOrigin=""
				/>
			</Head>
			<DynamicComponentWithNoSSR 
				locations={ locations }
				locationsType={ locationsType }
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
		.then(locations => ({ props: { locations }}))
		.catch(error => console.log(error));
};

export default Result;
