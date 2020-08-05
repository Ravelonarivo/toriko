import Head from 'next/head';
import { useRouter } from 'next/router';

const Result = () => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Result</title>
			</Head>
			<h1>{ router.query.result}</h1>
		</>
	);
};

export default Result;