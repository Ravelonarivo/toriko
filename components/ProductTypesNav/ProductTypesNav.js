import ProductTypeList from './ProductType/ProductTypeList';
import ProductSearch from './ProductSearch/ProductSearch';

import utilStyles from '../../styles/utils.module.css';

import { useState } from 'react';

const ProductTypesNav = ({ productTypes }) => {
	const [productTypeListDisplay, setProductTypeListDisplay] = useState('db');

	const toggleProductTypeList = isProductSearchOpen => {
		isProductSearchOpen 
			? setProductTypeListDisplay('dn')
			: setProductTypeListDisplay('db');
	};	

	return (
		<div className={ utilStyles.sticky + ' pv1 h3 bg-white shadow-5 w-100 flex items-center' } style={{ zIndex: '1' }}>
			<ProductSearch
				toggleProductTypeList={ toggleProductTypeList }
			/>
			<ProductTypeList 
				productTypes={ productTypes } 
				display={ productTypeListDisplay } 
			/>
		</div>
	);
};

export default ProductTypesNav;