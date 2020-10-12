import ProductList from './Product/ProductList';

const Menu = ({ products, productRefs, productTypes }) => {
	return (
		<div className="w-70-l mr5-ns">
			<ProductList
				products={products}
				productRefs={ productRefs }
				productTypes={productTypes}
			/>
		</div>
	);
};

export default Menu;