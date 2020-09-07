import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		const [locationIds] = param;
		db('speciality')
			.join('location', 'speciality.id', '=', 'location.speciality_id')
			.whereIn('location.id', JSON.parse(locationIds))
			.distinct('speciality.id', 'speciality.name')
		.then(specialities => {
			if (specialities.length > 0) {
				res.status(200).json(specialities);
				resolve();
			}
		})
		.catch(error => {
			res.status(400).json('error getting specialities');
			resolve();
		})	
	});
};