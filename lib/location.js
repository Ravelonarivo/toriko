import fetch from 'node-fetch';

export const getLocationsByType = async type => {
	const response = await fetch(`http://localhost:3004/locations?type=${ type }`) 
	return response.json();
};