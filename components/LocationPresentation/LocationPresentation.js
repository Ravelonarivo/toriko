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

	const addZero = time => {
		if (time < 10) time = '0' + time;
		return time;
	}; 

	const isOpen = openings => {
		let open = false;
		const today = new Date();
		const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
		const currentDay = days[today.getDay()];
		const currentTime = `${ addZero(today.getHours()) }:${ addZero(today.getMinutes()) }:${ addZero(today.getSeconds()) }`;
		const [opening] = openings.filter(opening => opening.day === currentDay);
		if ((currentTime >= opening.open) && (currentTime < opening.close)) {
			open = true;
		}
		
		return open;
	};

	console.log('ok');

	return (
		<div>
			<Slideshow pictures={ pictures }/>
			<Logo logo={ location.logo }/>
			
			<div className="mh6">
				<Header 
					location={ location }
					distance={ distance }
					openings={ openings }
					isOpen={ isOpen }
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