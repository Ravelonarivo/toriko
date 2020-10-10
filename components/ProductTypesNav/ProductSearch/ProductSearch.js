import MdSearch from 'react-ionicons/lib/MdSearch';
import MdClose from 'react-ionicons/lib/MdClose';

import { useState } from 'react';

const ProductSearch = ({ toggleProductTypeList }) => {
	const [widthAndBorder, setWidthAndBorder] = useState('w2-l w2-m bn');
	const [inputDisplayAndWidth, setInputDisplayAndWidth] = useState('dn w-10');
	const [isOpen, setIsOpen] = useState(false);
	const [buttonCloseDisplay, setButtonCloseDisplay] = useState('dn');

	const open = () => {
		setIsOpen(true);
		toggleProductTypeList(true);
		setWidthAndBorder('w-50-l w-50-m mr6 ba');
		setInputDisplayAndWidth('db w-100');
		setButtonCloseDisplay('db');
	};

	const close = () => {
		setIsOpen(false);
		toggleProductTypeList(false);
		setWidthAndBorder('w2-l w2-m bn');
		setInputDisplayAndWidth('dn w-10');
		setButtonCloseDisplay('dn');
	};

	return (
		<div className={ widthAndBorder + ' ml6 h-50 br2 ph1 b--moon-gray flex items-center' } style={{ transition: 'width 0.5s ease-out' }}>
			<div className="flex items-center" title="chercher un plat">
				<MdSearch onClick={ open } fontSize="25px" className="pointer" color="silver"/>
			</div>
			<input className={ inputDisplayAndWidth + ' bn' } type="text" placeholder="chercher un plat"/>
			<div className="flex items-center" title="fermer">
				<MdClose onClick={ close } fontSize="25px" className={ buttonCloseDisplay + ' pointer' } color="silver"/>
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