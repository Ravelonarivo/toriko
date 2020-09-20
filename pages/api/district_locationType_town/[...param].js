import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param.length === 2) {
			const [locationTypeId, townName] = param;
			db('district')
				.join('location', 'location.district_id', '=', 'district.id')
				.join('town', 'town.id', '=', 'district.town_id')
				.where('location.type_id', locationTypeId)
				.andWhere('town.name', townName)
				.distinct('district.id', 'district.name', 'district.latitude as lat', 'district.longitude as long', 'town.name as town')
			.then(districts => {
				if (districts.length > 0) {
					res.status(200).json(districts);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting districts');
				resolve();
			})	
		} else {
			const [townName] = param;
			db('district')
				.join('location', 'location.district_id', '=', 'district.id')
				.join('town', 'town.id', '=', 'district.town_id')
				.where('town.name', townName)
				.distinct('district.id', 'district.name', 'district.latitude as lat', 'district.longitude as long', 'town.name as town')
			.then(districts => {
				if (districts.length > 0) {
					res.status(200).json(districts);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting districts');
				resolve();
			})
		}
	});
};