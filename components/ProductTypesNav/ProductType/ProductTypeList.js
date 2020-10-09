
import ProductType from './ProductType';
import dynamic from "next/dynamic";

const ScrollspyNav = dynamic(
  () => {
    return import("react-scrollspy-nav");
  },
  { ssr: false }
);

const ProductTypeList = ({ productTypes }) => {
	const productTypesArray = productTypes.map(productType => productType.name);

	return (
		<div className="w-50-l mh6">
			<ScrollspyNav
                scrollTargetIds={ productTypesArray }
                offset={ 10 }
                activeNavClass="is-active"
                scrollDuration="500"
                headerBackground="true"
            >
				<ul className="scrollable pa0 ma0" style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
					{
						productTypes.map((productType, index) => (
							<ProductType 
								key={ index }
								productType={ productType }
							/>
						))
					}
				</ul>
			</ScrollspyNav>	
			<style>{`
				.is-active {
					color: black;
				}

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