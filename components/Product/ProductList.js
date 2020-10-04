import Product from './Product';

const ProductList = ({ products }) => {
	return (
		<div className="w-70-l mr5-ns">
			{
				products.map((product, index) => (
					<Product
						key={ index }
						product={ product }
					/>
				))
			}
		</div>
	);
};

export default ProductList;