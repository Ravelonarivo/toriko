import db from './db';

export const getProductsByLocationId = async locationId => {
	try {
		return await db('product')
			.join('location', 'location.id', '=', 'product.location_id')
			.join('product_type', 'product_type.id', '=', 'product.type_id')
			.where('location.id', locationId)
			.select('product.id', 'product.image', 'product.name', 'product.price', 'product.ingredient', 'product.multiple_size', 'product_type.name as type');
	} catch (error) {
		console.log(error);
	}
}

export const getProductTypesByLocationId = async locationId => {
	try {
		return await db('product_type')
			.join('product', 'type_id', '=', 'product_type.id')
			.join('location', 'location.id', '=', 'product.location_id')
			.where('location.id', locationId)
			.distinct('product_type.id', 'product_type.name')			
	} catch (error) {
		console.log(error);
	}
};