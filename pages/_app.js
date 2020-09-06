import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NextNprogress from 'nextjs-progressbar';

const App = ({ Component, pageProps }) => {
	return (
		<div>
			<NextNprogress />
			<Component { ...pageProps } />
		</div>
	);
};

export default App;