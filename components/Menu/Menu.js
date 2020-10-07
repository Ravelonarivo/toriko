import ProductList from './Product/ProductList';

const Menu = ({ products, productTypes }) => {
	return (
		<div className="mv5 w-70-l mr5-ns">
			<ProductList
				products={products}
				productTypes={productTypes}
			/>
		</div>
	);
};

export default Menu;