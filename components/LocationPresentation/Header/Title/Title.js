import { useState, useEffect } from 'react';

import differenceInMinutes from 'date-fns/differenceInMinutes';
import { usePosition } from 'use-position';

import { getDistanceBetweenLocationAndUserLocation } from '../../../../lib/functions';

const Title = ({ location, openings }) => {
	const [isGeolocationEnable, setIsGeolocationEnable] = useState(false);
	const [userLocation, setUserLocation] = useState([]);
	const [distance, setDistance] = useState('');
	// Location status
	const [status, setStatus] = useState('fermé');
	// Status color
	const [color, setColor] = useState('#dc3545');

	const watch = true;
	const {
		latitude,
		longitude,
		timestamp,
		accuracy,
		error,
	} = usePosition(watch, { enableHighAccuracy: true }); 

	useEffect(() => {
		// Get the user location if geolocation is enable
		if (error === null && latitude	&& longitude) {
			setIsGeolocationEnable(true);
			setUserLocation([latitude, longitude]);
		}
	}, [latitude, longitude]);
	
	useEffect(() => {
		const distance = isGeolocationEnable
			? getDistanceBetweenLocationAndUserLocation(location, userLocation)
			: '';
		if (distance.length) setDistance(distance);
	}, [isGeolocationEnable]);

	// Check status every second and update it if necessary
	useEffect(() => {
		setInterval(() => getStatus(openings), 1000);
	});

	/**
	* Values returned by getHours/getMinutes/getSeconds have h/m/s fomart if they are < 0
	* So adding 0 before them is necessary to have hh/mm/ss format 
	*/
	const addZero = time => {
		if (time < 10) time = '0' + time;
		return time;
	}; 

	const getMinuteBetweenDates = (today, timeLeft, timeRight) => {
		const currentDate = `${ today.getFullYear() }/${ today.getMonth() + 1 }/${ today.getDate() }`;
		// Date must have Date(YYYY,m,d,hh,mm,ss) format
		return differenceInMinutes(
		  new Date(...currentDate.split('/'), ...timeLeft.split(':')),
		  new Date(...currentDate.split('/'), ...timeRight.split(':'))
		);
	};

	const getStatus = openings => {
		const today = new Date();
		const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
		const currentDay = days[today.getDay()];
		const currentTime = `${ addZero(today.getHours()) }:${ addZero(today.getMinutes()) }:${ addZero(today.getSeconds()) }`;
		// Opening that matches to the currentDay opening
		const [opening] = openings.filter(opening => opening.day === currentDay);
		if ((currentTime >= opening.open) && (currentTime < opening.close)) {
			const minutes = getMinuteBetweenDates(today, opening.close, currentTime);
			// If there is 30mn or less before the location closes
			if (minutes <= 30) {
				setStatus('ferme bientôt');
				setColor('#ffc107');
			} else {
				setStatus('ouvert');
				setColor('#28a745');
			} 	
		} else if (currentTime < opening.open) {
			const minutes = getMinuteBetweenDates(today, opening.open, currentTime);
			// If there is 30mn or less before the location opens
			if (minutes <= 30) {
				setStatus('ouvre bientôt');
				setColor('#007bff');
			} 
		} else {
			setStatus('fermé');
			setColor('#dc3545');
		}
	};
	
	return (
		<div>
			<h2>
				{ location.name }&nbsp;
				{ distance }
			</h2>
			<span className="ba br4 db tc f7 b white" style={{ width: '6rem', border: `1px solid ${ color }`, background: `${ color }` }}>{ status }</span>
		</div>
	);
};

export default Title;