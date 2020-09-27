import Slideshow from './Slideshow/Slideshow';
import Logo from './Logo/Logo';
import Header from './Header/Header';
import Informations from './Informations/Informations';

const LocationPresentation = ({ location }) => {
	return (
		<div>
			<Slideshow/>
			<Logo/>
			
			<div className="mh6">
				<Header location={ location } />
				<Informations/>
			</div>
		</div>
	);
};

export default LocationPresentation;