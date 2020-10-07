import ProductType from './ProductType';

const ProductTypeList = ({ productTypes }) => {
	return (
		<div className="w-50-l mh6">
			<ul className="pa0" style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
				{
					productTypes.map((productType, index) => (
						<ProductType 
							key={ index }
							productType={ productType }
						/>
					))
				}
			</ul>
		</div>
	);
};

export default ProductTypeList;