import Slideshow from './Slideshow/Slideshow';
import Logo from './Logo/Logo';
import Header from './Header/Header';
import Informations from './Informations/Informations';

import { useState } from 'react';

const LocationPresentation = ({ location }) => {
	const [isInformationsOpened, setIsInformationsOpened] = useState(true);

	const collapseInformations = () => {
		isInformationsOpened 
			? setIsInformationsOpened(false) 
			: setIsInformationsOpened(true);
	};

	return (
		<div>
			<Slideshow/>
			<Logo/>
			
			<div className="mh6">
				<Header 
					location={ location }
					collapseInformations={ collapseInformations }  
				/>
				<Informations 
					isInformationsOpened={ isInformationsOpened }
				/>
			</div>
		</div>
	);
};

export default LocationPresentation;