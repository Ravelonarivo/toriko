import ProductType from './ProductType';

import { useRef, useState, useEffect } from 'react';

import IosArrowForward from 'react-ionicons/lib/IosArrowForward';

const ProductTypeList = ({ productTypes, display, menuProductTypeRefs }) => {
	const productTypeRefs = useRef([]);
	const productTypeListRef = useRef(null);

	const [showNextButton, setShowNextButton] = useState(null);

	useEffect(() => {
		toggleNextButton();
	}, []);

	useEffect(() => {
		productTypeListRef.current.addEventListener('scroll', toggleNextButton);
		return () => productTypeListRef.current.removeEventListener('scroll', toggleNextButton);
	});

	const toggleNextButton = () => {
		const lastProductTypeRef = productTypeRefs.current[productTypeRefs.current.length - 1];
		// div
		const parentData = lastProductTypeRef.parentElement.getBoundingClientRect();	
		// ul
		const containerData = lastProductTypeRef.parentElement.parentElement.getBoundingClientRect();
		if (parentData.right > containerData.right) {
			setShowNextButton(true);
		}

		if (parentData.right.toFixed(0) === containerData.right.toFixed(0)) {
			setShowNextButton(false);
		}
	};

	const scrollProductListToRigth = () => {
		for (const productTypeRef of productTypeRefs.current) {
			// div
			const parentData = productTypeRef.parentElement.getBoundingClientRect();
			// ul
			const container = productTypeRef.parentElement.parentElement;
			const containerData = container.getBoundingClientRect();
			if (parentData.right > containerData.right) {
				container.scrollLeft += (parentData.right - containerData.right) + 1;
				break;
			}
		}
	};

	return (
		<div className={ display +' w-50-l w-50-m' }>	
			<ul ref={ productTypeListRef } className="scrollable pa0 ma0" style={{ whiteSpace: 'nowrap', overflowX: 'auto', scrollBehavior: 'smooth' }}>
				{
					productTypes.map((productType, index) => (
						<ProductType
							key={index}
							productType={productType}
							menuProductTypeRefs={ menuProductTypeRefs } 
							index={ index }
							productTypeRefs={ productTypeRefs }
						/>
					))
				}
			</ul>
			<div className={ showNextButton ? 'nextbutton-visible flex items-center ml3 dim' : 'nextbutton-hidde flex items-center ml3' }  title="suivant" style={{ transition: 'visibility 0s linear 0.5s' }}>	
				<IosArrowForward
					onClick={ scrollProductListToRigth }
					fontSize="25px"
					className="pointer"
					color="silver"
				/> 
			</div>
			<style>{`
				.nextbutton-hidde {
					visibility: hidden;
				}

				.nextbutton-visible {
					visibility: visible;
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