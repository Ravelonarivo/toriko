import Image from '../../Image/Image';
import Information from './Information/Information';
import BookmarkButton from '../../BookmarkButton/BookmarkButton';

import { slugify } from '../../../lib/functions';

const Product = ({ index, product, productRefs, openPopup }) => {
	return (
		<div 
			ref={ element => productRefs.current[index] = element } 
			id={ slugify(product.name) } 
			className="db bg-white br3 pa2 mb3 shadow-4 w-100 h4 flex justify-between shadow-hover"
		>
			<div 
				className="flex pointer w-100"
				onClick={ () => openPopup(product, 'product') }
			>
				<Image 
					image={ product.image }
					imageStyle="w4 grow"
				/>
				<Information 
					product={ product } 
				/>
			</div>	
			<BookmarkButton />
			<style jsx>{`
				.decrease-opacity {
					opacity: 0.3;
				}
			`}</style>		
		</div>
	);
};

export default Product;