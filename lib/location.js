import fetch from 'node-fetch';
import db from './db';

export const getLocationsByTownNameAndTypeName = async (townName, locationTypeName) => {
	try {
		const locations =  await locationTypeName === 'afficher-tout' 
			? db('location')
				.join('district', 'location.district_id', '=', 'district.id')
				.join('town', 'district.town_id', '=', 'town.id')
				.join('location_type', 'location_type.id', '=', 'location.type_id')
				.where('town.name', townName)
				.select('location.id','location.name', 'location.slug', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type', 'location.speciality_id', 'location.district_id')
			: db('location')
				.join('district', 'location.district_id', '=', 'district.id')
				.join('town', 'district.town_id', '=', 'town.id')
				.join('location_type', 'location_type.id', '=', 'location.type_id')
				.where('town.name', townName)
				.andWhere('location_type.name', locationTypeName)
				.select('location.id','location.name', 'location.slug', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type', 'location.speciality_id', 'location.district_id')
			;
		return locations;
	} catch (error) {
		console.log(error);
	}
};

export const getLocationTypes = () => {
	return db.select('*').from('location_type')
		.then(locationTypes => locationTypes)
		.catch(error => console.log(error));
};

export const getLocations = () => {
	return db.select('*').from('location')
		.then(locations => locations)
		.catch(error => console.log(error));
};

export const getLocationBySlugAndTownName = async (locationSlug, townName) => {
	try {
		return await db('location')
			.join('district', 'district.id', '=', 'location.district_id')
			.join('town', 'town.id', '=', 'district.town_id')
			.where('location.slug', locationSlug)
			.andWhere('town.name', townName)
			.select('location.id' ,'location.name');
	} catch (error) {
		console.log(error);
	}
};