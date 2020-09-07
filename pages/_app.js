import '../styles/globals.css';
import 'tachyons'
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