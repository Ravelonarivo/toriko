import fetch from 'node-fetch';

export const getLocationTypes = async () => {
	const response = await fetch('http://localhost:3004/types');
	return response.json();
};