import db from './db';

export const getProductByLocationId = async locationId => {
	try {
		return await db('product')
			.join('location', 'location.id', '=', 'product.location_id')
			.join('product_type', 'product_type.id', '=', 'product.type_id')
			.where('location.id', locationId)
			.select('product.id', 'product.name', 'product.image', 'product.description', 'product_type.name as type');
	} catch (error) {
		console.log(error);
	}
}