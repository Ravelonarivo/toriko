import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param.length === 2) {
			const [districtId, locationTypeId] = param;
			db('location')
				.join('location_type', 'location.type_id', '=', 'location_type.id')
				.where('location.district_id', districtId)
				.andWhere('location_type.id', locationTypeId)
				.select('location.id', 'location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type', 'location.speciality_id', 'location.district_id')
			.then(locations => {
				if (locations.length > 0) {
					res.status(200).json(locations);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting locations');
				resolve();
			});
		} else {
			const [districtId] = param;
			db('location')
				.join('location_type', 'location.type_id', '=', 'location_type.id')
				.where('location.district_id', districtId)
				.select('location.id', 'location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type', 'location.speciality_id', 'location.district_id')
			.then(locations => {
				if (locations.length > 0) {
					res.status(200).json(locations);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting locations');
				resolve();
			});
		}
	});
};