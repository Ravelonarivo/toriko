import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param) {
			const [locationTypeId] = param;
			db('district')
				.join('location', 'district.id', '=', 'location.district_id')
				.where('location.type_id', locationTypeId)
				.distinct('district.id', 'district.name')
			.then(districts => {
				if (districts.length > 0) {
					res.status(200).json(districts);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting district.name');
				resolve();
			})	
		} else {
			db('district')
				.join('location', 'district.id', '=', 'location.district_id')
				.distinct('district.id', 'district.name')
			.then(districts => {
				if (districts.length > 0) {
					res.status(200).json(districts);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting district.name');
				resolve();
			})
		}
	});
};