import { putInPlural } from '../../../lib/functions';

const ProductType = ({ productType }) => {
	return (
		<li className="dib fn pa3 pointer h3 light-silver hover-black"><a href={ '#' + productType.name }>{ putInPlural(productType.name) }</a></li>
	);
};

export default ProductType;