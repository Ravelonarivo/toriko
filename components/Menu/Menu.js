import ProductList from './Product/ProductList';

const Menu = ({ products, productRefs, productTypes, menuProductTypeRefs, openPopup }) => {
	return (
		<div className="w-70-l mr5-ns">
			<ProductList
				products={products}
				productRefs={ productRefs }
				productTypes={productTypes}
				menuProductTypeRefs={ menuProductTypeRefs }
				openPopup={ openPopup }
			/>
		</div>
	);
};

export default Menu;