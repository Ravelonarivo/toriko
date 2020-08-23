import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param) {
			const [locationsTypeId] = param;
			db('product')
				.join('location', 'product.location_id', '=', 'location.id')
				.where('location.type_id', locationsTypeId)
				.distinct('product.name')
				/*
					.distinct('product_type.name')
					.join('product_type', 'product.type_id', '=', 'product_type.id')
				*/
			.then(products => {
				if (products.length > 0) {
					res.status(200).json(products);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting filteredLocations');
				resolve();
			})	
		} else {
			db('product')
				.join('location', 'product.location_id', '=', 'location.id')
				.distinct('product.name')
			.then(products => {
				if (products.length > 0) {
					res.status(200).json(products);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting filteredLocations');
				resolve();
			})
		}
	});
};