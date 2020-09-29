import db from '../../../lib/db';

export default ({ query: { param } }, res) => {
	return new Promise((resolve, reject) => {
		const [productName, townName] = param;
		db('location')
			.join('location_type', 'location_type.id', '=', 'location.type_id')
			.join('product', 'product.location_id', '=', 'location.id')
			.join('district', 'district.id', '=', 'location.district_id')
			.join('town', 'town.id', '=', 'district.town_id')
			.where('product.name', productName)
			.andWhere('town.name', townName)
			.select('location.id', 'location.name', 'location.slug', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type', 'location.speciality_id', 'location.district_id')
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
	});
};