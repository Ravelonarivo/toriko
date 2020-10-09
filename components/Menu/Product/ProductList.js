import Product from './Product';

import { putInPlural } from '../../../lib/functions';

const ProductList = ({ products, productTypes }) => {
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
											product={ product }
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