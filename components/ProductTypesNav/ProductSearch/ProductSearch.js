import MdSearch from 'react-ionicons/lib/MdSearch';
import MdClose from 'react-ionicons/lib/MdClose';

import { slugify } from '../../../lib/functions';

import { useState, useEffect, useRef } from 'react';

const ProductSearch = ({ toggleProductTypeList, productRefs, products }) => {
	const [widthAndBorder, setWidthAndBorder] = useState('w2-l w2-m bn');
	const [inputDisplayAndWidth, setInputDisplayAndWidth] = useState('dn w-10');
	const [isOpen, setIsOpen] = useState(false);
	const [buttonCloseDisplay, setButtonCloseDisplay] = useState('dn');

	const [searchFieldValue, setSearchFieldValue] = useState('');

	const searchFieldRef = useRef(null);

	useEffect(() => {
		if (searchFieldValue.length) {
			for (const productRef of productRefs.current) {
				if (slugify(searchFieldValue) === productRef.id) {
					productRef.classList.remove('decrease-opacity');
					window.scrollTo({ behavior: 'smooth', top: productRef.offsetTop - 100 });
					break;
				}
			}
		}
	}, [searchFieldValue]);

	useEffect(() => {
		if (searchFieldValue.length === 0) {
			productRefs.current.forEach(productRef => {
				if (productRef.classList.contains('decrease-opacity')) {
					productRef.classList.remove('decrease-opacity');
				}			
			});
		}
	});

	const open = () => {
		setIsOpen(true);
		toggleProductTypeList(true);
		setWidthAndBorder('w-50-l w-50-m ba');
		setInputDisplayAndWidth('db w-100');
		setButtonCloseDisplay('db');
	};

	const close = () => {
		setIsOpen(false);
		toggleProductTypeList(false);
		setWidthAndBorder('w2-l w2-m bn');
		setInputDisplayAndWidth('dn w-10');
		setButtonCloseDisplay('dn');
		clearSearchField();
	};

	const searchFieldValueChanged = event => {
		productRefs.current.forEach(productRef => {
			productRef.classList.add('decrease-opacity');
		});

		setSearchFieldValue(event.target.value);
	}

	const clearSearchField = () => {
		if (setSearchFieldValue.length) {
			searchFieldRef.current.value = '';
			setSearchFieldValue('');
		}
	};

	return (
		<div className={ widthAndBorder + ' ml6 h-50 br2 ph1 b--moon-gray flex items-center' } style={{ transition: 'width 0.5s ease-out' }}>
			<div className="flex items-center" title="chercher un plat">
				<MdSearch 
					onClick={ open } 
					fontSize="25px" 
					className="pointer" 
					color="silver"
				/>
			</div>
			<input
				ref={ searchFieldRef } 
				onChange={ searchFieldValueChanged }
				onFocus={ clearSearchField } 
				list="products" 
				className={ inputDisplayAndWidth + ' bt-0 bb-0 bl-0 h-100 br b--moon-gray' } 
				type="text" 
				placeholder="chercher un plat"
			/>
			<datalist id="products">
				{
					searchFieldValue.length
						?	products.map((product, index) => (
								<option
									key={ index } 
									value={ product.name }
								>
									{ product.type }
								</option>
							))
						:   ''
				}
			</datalist>
			<div className="flex items-center ml1 dim" title="fermer">
				<MdClose 
					onClick={ close } 
					fontSize="25px" 
					className={ buttonCloseDisplay + ' pointer' } 
					color="silver"
				/>
			</div>
			<style jsx>{`
				input:focus {
					outline: none;
				}
			`}</style>
		</div>
	);
};

export default ProductSearch;