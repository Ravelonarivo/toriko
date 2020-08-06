import Head from 'next/head';
import { useRouter } from 'next/router';
import { getTypes } from '../../lib/type';
import { getLocationsByType } from '../../lib/location';

const Result = ({ locations }) => {
	console.log(locations);
	const router = useRouter();
	const type = router.query.type;

	return (
		<div>
			<Head>
				<title>Type</title>
			</Head>
			<h1>{ type }</h1>
		</div>
	);
};

export const getStaticPaths = async () => {
	try {
		const types = await getTypes();
		const paths = types.map(type => ({
			params: { type: type.name }
		}));

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
