import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param.length === 2) {
			const [locationTypeId, townName] = param;
			db('product')
				.join('product_type', 'product_type.id', '=', 'product.type_id')
				.join('location', 'location.id', '=', 'product.location_id')
				.join('district', 'district.id', '=', 'location.district_id')
				.join('town', 'town.id', '=', 'district.town_id')
				.where('location.type_id', locationTypeId)
				.andWhere('town.name', townName)
				.distinct('product.name', 'product_type.name as type')
			.then(products => {
				if (products.length > 0) {
					res.status(200).json(products);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting products');
				resolve();
			})	
		} else {
			const [townName] = param;
			db('product')
				.join('product_type', 'product_type.id', '=', 'product.type_id')
				.join('location', 'location.id', '=', 'product.location_id')
				.join('district', 'district.id', '=', 'location.district_id')
				.join('town', 'town.id', '=', 'district.town_id')
				.where('town.name', townName)
				.distinct('product.name', 'product_type.name as type')
			.then(products => {
				if (products.length > 0) {
					res.status(200).json(products);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting products');
				resolve();
			})
		}
	});
};