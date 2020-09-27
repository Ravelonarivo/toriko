import Title from './Title/Title';
import Like from '../../Like/Like';

const Header = ({ location }) => {
	return (
		<div className="w-100">
			<Title location={ location } />
			<Like />
		</div>
	);
};

export default Header;