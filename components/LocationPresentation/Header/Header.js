import Title from './Title/Title';
import InformationButton from './InformationButton/InformationButton';
import LikeButton from './LikeButton/LikeButton';

import BookMarkButton from '../../BookMarkButton/BookMarkButton';

const Header = ({ location, openings, collapseInformations }) => {
	return (
		<div className="w-100 flex justify-between">
			<div className="db dib-ns w-50-l w-100-m">
				<div className="flex">
					<Title 
						location={ location } 
						openings={ openings }
					/>
					<InformationButton collapseInformations={ collapseInformations } />
				</div>
			</div>
			<div className="flex items-center">
				<LikeButton />
				<BookMarkButton	/>
			</div>
		</div>
	);
};

export default Header;