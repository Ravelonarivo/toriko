import '../styles/globals.css';
import 'tachyons';
import 'react-slideshow-image/dist/styles.css';

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