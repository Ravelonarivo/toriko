import Image from '../../Image/Image';
import Information from './Information/Information';

const Product = ({ product }) => {
	return (
		<div className="db bg-white pointer br3 pa2 mb3 grow shadow-4 w-100 h4 flex">
			<Image 
				image={ product.image }
			/>
			<Information 
				product={ product } 
			/>			
		</div>
	);
};

export default Product;