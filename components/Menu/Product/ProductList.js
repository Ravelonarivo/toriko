import Product from './Product';

const ProductList = ({ products, productTypes }) => {
	return (
		<div className="w-70-l mr5-ns">
			{
				productTypes.map((productType, index) =>  (
					<div key={ index }>
						<h2 className={ index === 0 ? 'tc' : 'tc mt5' }>{ productType.name }s</h2>
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