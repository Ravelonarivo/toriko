import Image from '../../Image/Image';
import Information from './Information/Information';

import { slugify } from '../../../lib/functions';

const Product = ({ index, product, productRefs }) => {
	return (
		<div 
			ref={ element => productRefs.current[index] = element } 
			id={ slugify(product.name) } 
			className="db bg-white pointer br3 pa2 mb3 shadow-4 w-100 h4 flex shadow-hover"
		>
			<Image 
				image={ product.image }
			/>
			<Information 
				product={ product } 
			/>	
			<style jsx>{`
				.decrease-opacity {
					opacity: 0.3;
				}
			`}</style>		
		</div>
	);
};

export default Product;