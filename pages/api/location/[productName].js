import db from '../../../lib/db';

export default ({ query: { productName } }, res) => {
	return new Promise((resolve, reject) => {
		db('location')
			.join('product', 'location.id', '=', 'product.location_id')
			.where('product.name', productName)
			.select('location.id', 'location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type')
			.join('location_type', 'location.type_id', '=', 'location_type.id')
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