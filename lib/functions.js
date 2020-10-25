import { getDistance, convertDistance } from 'geolib';
import differenceInDays from 'date-fns/differenceInDays';

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

export const putInPlural = productTypeName => {
	return productTypeName[productTypeName.length -1] !== 's'
		? productTypeName + 's'
		: productTypeName
}; 

export const slugify = element => {
	return element.split(' ').join('_');
};

export const getAnnouncemenDate = announcement => {
	// Date in millisecond
	let date = new Date(parseInt(announcement.date));
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	const today = new Date();
	const difference = differenceInDays(
		new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
		new Date(year, month, day)
	);

	if (difference === 0) {
		date = "Aujourd'hui";
	} else if (difference === 1) {
		date = "Hier";
	} else {
		date = `${day}/${month}/${year}`;
	}

	return date;
};