import { putInPlural } from '../../../lib/functions';

const ProductType = ({ productType }) => {
	return (
		<li className="dib fn pa3 b--moon-gray pointer h3 light-silver hover-black">{ putInPlural(productType.name) }</li>
	);
};

export default ProductType;