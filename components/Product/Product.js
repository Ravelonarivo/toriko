import Image from '../Image/Image';

const Product = ({ product }) => {
	return (
		<div className="db bg-white pointer br3 ph3 pv2 mb3 grow shadow-4 w-100 flex">
			<div className="w-20 mt2 br3 mr3">
				<Image image={ product.image }/>
			</div>
			<div>
				{ product.name }
			</div>
		</div>
	);
};

export default Product;