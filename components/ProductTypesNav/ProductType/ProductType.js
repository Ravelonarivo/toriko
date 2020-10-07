const ProductType = ({ productType }) => {
	return (
		<li className="dib fn ba br4 ph4 mr3 b--moon-gray pointer h2 light-silver hover-black">{ productType.name }s</li>
	);
};

export default ProductType;