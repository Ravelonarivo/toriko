import Product from './Product';

import { putInPlural } from '../../../lib/functions';

const ProductList = ({ products, productTypes }) => {
	return (
		<div>
			{
				productTypes.map((productType, index) =>  (
					<div key={ index }>
						<h2 className={ index === 0 ? 'tc' : 'tc mt5' }>{ putInPlural(productType.name) }</h2>
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