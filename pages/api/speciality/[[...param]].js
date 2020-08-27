import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param) {
			const [locationTypeId] = param;
			db('speciality')
				.join('location', 'speciality.id', '=', 'location.speciality_id')
				.join('location_type', 'location.type_id', '=', 'location_type.id')
				.where('location.type_id', locationTypeId)
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
		} else {
			db('speciality')
				.join('location', 'speciality.id', '=', 'location.speciality_id')
				.join('location_type', 'location.type_id', '=', 'location_type.id')
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
		}
	});
};