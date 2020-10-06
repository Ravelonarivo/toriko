import ProductList from './Product/ProductList';
import AnnouncementList from './Announcement/AnnouncementList';

const Menu = ({ products, productTypes, location, announcements }) => {
	return (
		<div className="bg-black-05">
			<div className="pv5 mh6 flex">
				<ProductList 
					products={ products }
					productTypes={ productTypes }
				/>
				<AnnouncementList
					location={ location }
					announcements={ announcements }
				/>
			</div>
		</div>
	);
};

export default Menu;