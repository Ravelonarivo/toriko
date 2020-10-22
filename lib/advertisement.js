import db from './db';

export const getAdvertisementsByLocationId = async locationId => {
	try {
		return await db('advertisement')
			.join('location', 'location.id', '=', 'advertisement.location_id')
			.where('location.id', locationId)
			.orderBy('advertisement.date', 'desc')
			.select('advertisement.id', 'advertisement.title', 'advertisement.date', 'advertisement.display', 'advertisement.image');
	} catch (error) {
		console.log(error);
	}
};