import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param.length == 2) {
			const [locationTypeId, townName] = param;
			db('product_type')
				.join('product', 'product.type_id', '=', 'product_type.id')
				.join('location', 'location.id', '=', 'product.location_id')
				.join('district', 'district.id', '=', 'location.district_id')
				.join('town', 'town.id', '=', 'district.town_id')
				.where('location.type_id', locationTypeId)
				.andWhere('town.name', townName)
				.distinct('product_type.name')
			.then(productTypes => {
				if (productTypes.length > 0) {
					res.status(200).json(productTypes);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting product_type.name');
				resolve();
			})	
		} else {
			const [townName] = param;
			db('product_type')
				.join('product', 'product.type_id', '=', 'product_type.id')
				.join('location', 'location.id', '=', 'product.location_id')
				.join('district', 'district.id', '=', 'location.district_id')
				.join('town', 'town.id', '=', 'district.town_id')
				.where('town.name', townName)
				.distinct('product_type.name')
			.then(productTypes => {
				if (productTypes.length > 0) {
					res.status(200).json(productTypes);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting product_type.name');
				resolve();
			})
		}
	});
};