import ProductType from './ProductType';

const ProductTypeList = ({ productTypes, display, menuProductTypeRefs }) => {
	const productTypesArray = productTypes.map(productType => productType.name);

	return (
		<div className={ display +' w-50-l w-50-m' }>	
			<ul className="scrollable pa0 ma0" style={{ whiteSpace: 'nowrap', overflowX: 'auto', scrollBehavior: 'smooth' }}>
				{
					productTypes.map((productType, index) => (
						<ProductType
							key={index}
							productType={productType}
							menuProductTypeRefs={ menuProductTypeRefs } 
						/>
					))
				}
			</ul>	
			<style>{`
				/* Hide scrollbar for Chrome, Safari and Opera */
				.scrollable::-webkit-scrollbar {
				    display: none;
				}

				/* Hide scrollbar for IE, Edge and Firefox */
				.scrollable {
				  -ms-overflow-style: none;  /* IE and Edge */
				  scrollbar-width: none;  /* Firefox */
				}
			`}</style>
		</div>
	);
};

export default ProductTypeList;