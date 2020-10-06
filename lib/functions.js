import { getDistance, convertDistance } from 'geolib';

export const getDistanceBetweenLocationAndUserLocation = (location, userLocation) => {
	const [latitude, longitude] = userLocation;
	const distance = getDistance({ latitude: location.lat, longitude: location.long }, { latitude, longitude });
	return distance >= 1000
		? '(' + convertDistance(distance, 'km').toFixed(1) + 'km)'
		: '(' + distance + 'm)'
};

export const formatText = (text, maxCharacter) => {
	return text.length >= maxCharacter
		? text.slice(0, maxCharacter) + ' ...'
		: text 
};