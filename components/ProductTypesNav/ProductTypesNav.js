import ProductTypeList from './ProductType/ProductTypeList';

import utilStyles from '../../styles/utils.module.css';

const ProductTypesNav = ({ productTypes }) => {
	return (
		<div className={ utilStyles.sticky + ' pv1 h3 bg-white shadow-5 w-100 flex items-center' } style={{ zIndex: '1' }}>
			<ProductTypeList 
				productTypes={ productTypes } 
			/>
		</div>
	);
};

export default ProductTypesNav;