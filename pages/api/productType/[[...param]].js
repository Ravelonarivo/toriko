import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param) {
			const [locationTypeId] = param;
			db('product')
				.join('location', 'product.location_id', '=', 'location.id')
				.join('product_type', 'product.type_id', '=', 'product_type.id')
				.where('location.type_id', locationTypeId)
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
			db('product')
				.join('location', 'product.location_id', '=', 'location.id')
				.join('product_type', 'product.type_id', '=', 'product_type.id')
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