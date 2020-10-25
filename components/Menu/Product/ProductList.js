import Product from './Product';

import { putInPlural } from '../../../lib/functions';

const ProductList = ({ products, productRefs, productTypes, menuProductTypeRefs, openPopup }) => {
	return (
		<div>
			{
				productTypes.map((productType, index) =>  (
					<div 
						ref={ element => menuProductTypeRefs.current[index] = element }  
						key={ index } 
						id={ productType.name }
					>
						<h2 className='tc mt5'>{ putInPlural(productType.name) }</h2>
						{
							products.map((product, index) =>
								product.type === productType.name
									?	<Product
											key={ index }
											index={ index }
											product={ product }
											productRefs={ productRefs }
											openPopup={ openPopup }
										/>
									:  	''	
							)
						}
					</div>					
				))
			}
		</div>
	);
};

export default ProductList;