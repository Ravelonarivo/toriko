import { putInPlural } from '../../../lib/functions';

import { useRef, useEffect } from 'react';

const ProductType = ({ productType }) => {
	const productTypeRef = useRef(null);

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
		<li className="dib fn pa3 pointer h3 light-silver hover-black"><a ref={ productTypeRef } href={ '#' + productType.name }>{ putInPlural(productType.name) }</a></li>
	);
};

export default ProductType;