import Slideshow from './Slideshow/Slideshow';
import Logo from './Logo/Logo';
import Header from './Header/Header';
import Informations from './Informations/Informations';



import { useState, useEffect } from 'react';

const LocationPresentation = ({ location, openings, pictures }) => {
	const [isInformationsOpened, setIsInformationsOpened] = useState(true);
	const [distance, setDistance] = useState('');

	useEffect(() => {
		const savedDistance = localStorage.getItem('distance');
		if (savedDistance) setDistance(savedDistance);
	}, []);

	const collapseInformations = () => {
		isInformationsOpened 
			? setIsInformationsOpened(false) 
			: setIsInformationsOpened(true);
	};

	return (
		<div>
			<Slideshow pictures={ pictures }/>
			<Logo logo={ location.logo }/>
			
			<div className="mh6">
				<Header 
					location={ location }
					distance={ distance }
					openings={ openings }
					collapseInformations={ collapseInformations }  
				/>
				<Informations 
					location={ location }
					openings={ openings }
					isInformationsOpened={ isInformationsOpened }
				/>
			</div>
		</div>
	);
};

export default LocationPresentation;