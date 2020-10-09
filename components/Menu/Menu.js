import ProductList from './Product/ProductList';

const Menu = ({ products, productTypes }) => {
	return (
		<div className="w-70-l mr5-ns">
			<ProductList
				products={products}
				productTypes={productTypes}
			/>
		</div>
	);
};

export default Menu;