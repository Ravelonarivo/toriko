import db from './db';

export const getAnnouncementsByLocationId = async locationId => {
	try {
		return await db('announcement')
			.join('location', 'location.id', '=', 'announcement.location_id')
			.where('location.id', locationId)
			.select('announcement.id', 'announcement.title', 'announcement.date', 'announcement.detail', 'announcement.display', 'announcement.image');
	} catch (error) {
		console.log(error);
	}
};