import Slideshow from './Slideshow/Slideshow';
import Logo from './Logo/Logo';
import Header from './Header/Header';
import Informations from './Informations/Informations';

import { useState, useEffect } from 'react';

const LocationPresentation = ({ location, openings, pictures }) => {
	const [isInformationsOpened, setIsInformationsOpened] = useState(false);

	const collapseInformations = () => {
		isInformationsOpened 
			? setIsInformationsOpened(false) 
			: setIsInformationsOpened(true);
	};

	// Close location information when it is opened and out of the window viewport
	const collapseInformationsByVisibility = isVisible => {
		if (!isVisible) {
			isInformationsOpened ? setIsInformationsOpened(false) : '';
		}
	};

	return (
		<div className="bb b--moon-gray pb3">
			<Slideshow pictures={ pictures }/>
			<Logo logo={ location.logo }/>
			
			<div className="mh6">
				<Header 
					location={ location }
					openings={ openings }
					collapseInformations={ collapseInformations }  
				/>
				<Informations 
					location={ location }
					openings={ openings }
					isInformationsOpened={ isInformationsOpened }
					collapseInformationsByVisibility={ collapseInformationsByVisibility }
				/>
			</div>
		</div>
	);
};

export default LocationPresentation;