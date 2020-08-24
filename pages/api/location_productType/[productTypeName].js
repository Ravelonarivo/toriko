import db from '../../../lib/db';

export default ({ query: { productTypeName } }, res) => {
	return new Promise((resolve, reject) => {
		db('location')
			.join('location_type', 'location.type_id', '=', 'location_type.id')
			.join('product', 'location.id', '=', 'product.location_id')
			.join('product_type', 'product.type_id', '=', 'product_type.id')
			.where('product_type.name', productTypeName)
			.distinct('location.id', 'location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type')
		.then(locations => {
			if (locations.length > 0) {
					res.status(200).json(locations);
					resolve();
			}
		})
		.catch(error => {
			res.status(400).json('error getting filteredLocations');
			resolve();
		});	
	});
};