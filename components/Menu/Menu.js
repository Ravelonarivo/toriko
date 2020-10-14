import ProductList from './Product/ProductList';

const Menu = ({ products, productRefs, productTypes, menuProductTypeRefs }) => {
	return (
		<div className="w-70-l mr5-ns">
			<ProductList
				products={products}
				productRefs={ productRefs }
				productTypes={productTypes}
				menuProductTypeRefs={ menuProductTypeRefs }
			/>
		</div>
	);
};

export default Menu;