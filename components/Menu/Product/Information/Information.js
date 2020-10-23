import { formatText } from '../../../../lib/functions';

import BookmarkButton from '../../../BookmarkButton/BookmarkButton';

const Information = ({ product }) => {
	return (
		<div className="w-80 mh3">
			<div className="h-100">
				<div className="flex justify-between">
					<h4 className="mv0">{ product.name }</h4>
					<BookmarkButton />
				</div>

				<div className="mv1 h-50">
					<p className="f6 mv0 lh-title">{ formatText(product.ingredient, 125) }</p>
				</div>
				<span>
					{
						product.multiple_size
							? 'À partir de '
							: ''
					}
					<span className="b">{ product.price }CFA</span>
				</span>
			</div>
		</div>
	);
};

export default Information;