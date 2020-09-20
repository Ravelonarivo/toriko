import db from '../../../lib/db';

export default ({ query: { townName } }, res) => {
	return new Promise((resolve, reject) => {
		db('location_type')
			.join('location', 'location.type_id', '=', 'location_type.id')
			.join('district', 'district.id', '=', 'location.district_id')
			.join('town', 'town.id', '=', 'district.town_id')
			.where('town.name', townName)
			.distinct('location_type.id', 'location_type.name')
		.then(locationTypes => {
			if (locationTypes.length > 0) {
				res.status(200).json(locationTypes);
				resolve();
			}
		})
		.catch(error => {
			res.status(400).json('error getting locationTypes');
			resolve();
		});	
	});
};