import { formatText } from '../../../../lib/functions';

const Information = ({ product }) => {
	return (
		<div className="w-70 mh3">
			<div className="h-100">
				<h4 className="mv0">{ product.name }</h4>
				
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