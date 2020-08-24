import fetch from 'node-fetch';
import db from './db';

export const getLocationsByTypeName = async locationTypeName => {
	try {
		const locations = locationTypeName === 'afficher-tout' 
			? db('location')
				.join('location_type', 'type_id', '=', 'location_type.id')
				.select('location.id','location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type')
			: db('location')
				.join('location_type', 'type_id', '=', 'location_type.id')
				.where('location_type.name', locationTypeName)
				.select('location.id','location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type')
			;
		return locations;
	} catch (error) {
		console.log(error);
	}
};