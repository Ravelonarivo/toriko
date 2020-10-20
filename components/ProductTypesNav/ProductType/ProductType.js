import { putInPlural } from '../../../lib/functions';

import { useRef, useEffect } from 'react';

const ProductType = ({ productType, menuProductTypeRefs, index, productTypeRefs }) => {
	//const productTypeRef = useRef(null);

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
	
	useEffect(() => {
		window.addEventListener('scroll', higlightProductType);	
		return () => window.removeEventListener('scroll', higlightProductType);
	});

	// Listen windows scroll event and highlight the nav productType that match to the menu producType  
	const higlightProductType = () => {	
		menuProductTypeRefs.current.forEach(menuProductTypeRef => {
			// values are in pixel
			const menuProductTypeRefTop = Math.round(menuProductTypeRef.getBoundingClientRect().top);
			const menuProductTypeRefBottom = Math.round(menuProductTypeRef.getBoundingClientRect().bottom);
			if ((menuProductTypeRefTop > 0 && menuProductTypeRefTop <= 100) || (menuProductTypeRefBottom >= 100 && menuProductTypeRefBottom <= (window.innerHeight || document.documentElement.clientHeight))) {
				productTypeRefs.current.forEach(productTypeRef => {
					if (productTypeRef.dataset.name === menuProductTypeRef.id) {
						productTypeRef.classList.add('is-active');
					} else {
						productTypeRef.classList.remove('is-active');
					}
				});
			}
		});
	}
 
	useEffect(() => {
		productTypeRefs.current.forEach(productTypeRef => {
			const observer = new MutationObserver(event => {
				const [MutationRecord] = event;
				// productTypeRef that mutated
				const mutatedProductTypeRef = MutationRecord.target;
				if (mutatedProductTypeRef.classList.contains('is-active')) {
					// div
					const parent = mutatedProductTypeRef.parentElement;
					// ul
					const container = mutatedProductTypeRef.parentElement.parentElement;
					// scroll active tag parent to be visible if it is out of his scrollable container
					scrollToBeVisible(parent, container);
				}
			});

			observer.observe(productTypeRef, {
				attributes: true,
				attributeFilter: ['class'],
				childList: false,
				characterData: false
			});
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
				ref={ element => productTypeRefs.current[index] = element }
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