import Head from 'next/head';
import { useRouter } from 'next/router'
import fetch from 'node-fetch';

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
	const response = await fetch('http://localhost:3004/types');
	const types = await response.json();

	const paths = types.map(type => ({
		params: { type: type.name }
	}));

	return { 
		paths, 
		fallback: false 
	};
}; 

export const getStaticProps = ({ params }) => {
	return fetch(`http://localhost:3004/locations?type=${ params.type }`)
		.then(response => response.json())
		.then(locations => ({ props: { locations }}))
		.catch(error => console.log(error));
};

export default Result;
