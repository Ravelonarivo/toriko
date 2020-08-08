import fetch from 'node-fetch';

export const getLocationsByType = async type => {
	const response = type === 'afficher-tout' 
		? await fetch('http://localhost:3004/locations') 
		: await fetch(`http://localhost:3004/locations?type=${ type }`) 
	return response.json();
};