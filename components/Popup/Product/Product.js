import BookmarkButton from '../../BookmarkButton/BookmarkButton';
import CloseButton from '../../CloseButton/CloseButton';
import Image from '../../Image/Image';

const Product = ({ product, closeButtonRef, close }) => {
	return (
		<div className="w-100 h-100">
			<div className="flex items-center justify-between pa1 bb b--moon-gray">
				<BookmarkButton />
				<h3 className="mv0">{ product.name }</h3>
				<CloseButton
					closeButtonRef={closeButtonRef}
					close={close}
					closeButtonDisplay='db'
				/>
			</div>
			<Image
				image={ product.image }
				imageStyle="w-100 h-50"
			/>
			<div style={{ height: '33%' }}>
				<div className="tc mv1">
					<span>
						{
							product.multiple_size
								? 'À partir de '
								: ''
						}
						<span className="b">{ product.price }CFA</span>
					</span>
				</div>
				<div className="f6 lh-title bt bb b--moon-gray pa2 h-100" style={{ overflowY: 'auto' }}>
					<p className="mv0">{ product.ingredient }</p>
					<p>{ product.description }</p>
				</div>
			</div>
		</div> 
	);
};

export default Product;