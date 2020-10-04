import ProductList from './Product/ProductList';
import Favorite from './Favorite/Favorite';

const Menu = ({ products, location }) => {
	return (
		<div className="bg-black-05">
			<div className="pv5 mh6 flex">
				<ProductList 
					products={ products }
				/>
				<Favorite
					location={ location }
				/>
			</div>
		</div>
	);
};

export default Menu;