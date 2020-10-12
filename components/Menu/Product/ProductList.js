import Product from './Product';

import { putInPlural } from '../../../lib/functions';

const ProductList = ({ products, productRefs, productTypes }) => {
	return (
		<div>
			{
				productTypes.map((productType, index) =>  (
					<div key={ index } id={ productType.name }>
						<h2 className='tc pt2'>{ putInPlural(productType.name) }</h2>
						{
							products.map((product, index) =>
								product.type === productType.name
									?	<Product
											key={ index }
											index={ index }
											product={ product }
											productRefs={ productRefs }
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