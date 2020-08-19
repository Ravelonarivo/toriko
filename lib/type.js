import fetch from 'node-fetch';
import db from './db';

export const getLocationTypes = () => {
	return db.select('*').from('location_type')
		.then(types => types)
		.catch(error => console.log(error));
};