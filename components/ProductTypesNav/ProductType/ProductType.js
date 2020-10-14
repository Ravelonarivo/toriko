import { putInPlural } from '../../../lib/functions';

import { useRef, useEffect } from 'react';

const ProductType = ({ productType, menuProductTypeRefs }) => {
	const productTypeRef = useRef(null);

	const scrollToMenuProductType = productTypeName => {
		for (const menuProductTypeRef of  menuProductTypeRefs.current) {
			if (productTypeName === menuProductTypeRef.id) {
				window.scrollTo({
					behavior: 'smooth', 
					top: menuProductTypeRef.offsetTop - 100
				});
				break;
			}
		};
	};

	// Listen windows scroll event and highlight nav the productType that match to the menu producType  
	useEffect(() => {
		window.addEventListener('scroll', event => {	
			menuProductTypeRefs.current.forEach(menuProductTypeRef => {
				const menuProductTypeTagId = menuProductTypeRef.id;
				// values are in pixel
				const menuProductTypeTagTop = Math.round(menuProductTypeRef.getBoundingClientRect().top);
				const menuProductTypeTagBottom = Math.round(menuProductTypeRef.getBoundingClientRect().bottom);
				if ((menuProductTypeTagTop > 0 && menuProductTypeTagTop <= 100) || (menuProductTypeTagBottom >= 100 && menuProductTypeTagBottom <= (window.innerHeight || document.documentElement.clientHeight))) {
					if (productTypeRef.current.dataset.name === menuProductTypeTagId) {
						productTypeRef.current.classList.add('is-active');
					} else {
						productTypeRef.current.classList.remove('is-active');
					}
				}
			});  				          	
		});
	});

	useEffect(() => {
		// a tag
		const productTypeTag = productTypeRef.current
		const observer = new MutationObserver(event => {
			const [MutationRecord] = event;
			// productTypeTag that mutated
			const mutatedProductTypeTag = MutationRecord.target;
			if (mutatedProductTypeTag.classList.contains('is-active')) {
				// li tag
				const parent = mutatedProductTypeTag.parentElement;
				// ul tag
				const container = mutatedProductTypeTag.parentElement.parentElement;
				// scroll active tag parent to be visible if it is out of his scrollable container
				scrollToBeVisible(parent, container);
			}
		});

		observer.observe(productTypeTag, {
			attributes: true,
			attributeFilter: ['class'],
			childList: false,
			characterData: false
		});
	});

	const scrollToBeVisible = (element, container) => {
		const elementData = element.getBoundingClientRect();
		const containerData = container.getBoundingClientRect();
	    if (elementData.left < containerData.left) {
	        // Scroll to the left of container
	        container.scrollLeft -= (containerData.left - elementData.left);
	    } else if (elementData.right > containerData.right) {
	        // Scroll to the rigth of container
	        container.scrollLeft += (elementData.right - containerData.right);
	    }
	};
	
	return (
		<div className="dib">
			<li 	
				ref={ productTypeRef }
				data-name={ productType.name }
				onClick={ () => scrollToMenuProductType(productType.name) } 
				className="dib fn pv3 pr4 pointer h3 light-silver hover-black"
			>
				{ putInPlural(productType.name) }
			</li>
			<style jsx>{`
				.is-active {
					color: black;
				}
			`}</style>
		</div>
	);
};

export default ProductType;