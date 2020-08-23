import db from '../../../lib/db';

export default ({ query: { param }}, res) => {
	return new Promise((resolve, reject) => {
		if (param) {
			const [locationsTypeId] = param;
			db('product')
				.join('location', 'product.location_id', '=', 'location.id')
				.where('location.type_id', locationsTypeId)
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

	/*return new Promise((resolve, reject) => {
		if (locationsType === 'afficher-tout') {
			db('location')
				.join('location_type', 'type_id', '=', 'location_type.id')
				.where('location.name', 'like', `%${searchFieldInput}%`)
				.select('location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type')
			.then(filteredLocations => {
				if (filteredLocations.length > 0) {
					res.status(200).json(filteredLocations);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting filteredLocations');
				resolve();
			})	
		} else {
			db('location')
				.join('location_type', 'type_id', '=', 'location_type.id')
				.where('location.name', 'like', `%${searchFieldInput}%`)
				.andWhere('location_type.name', locationsType)
				.select('location.name', 'location.latitude as lat', 'location.longitude as long', 'location_type.name as type')
			.then(filteredLocations => {
				if (filteredLocations.length > 0) {
					res.status(200).json(filteredLocations);
					resolve();
				}
			})
			.catch(error => {
				res.status(400).json('error getting filteredLocations');
				resolve();
			})
		}
	});	*/
};