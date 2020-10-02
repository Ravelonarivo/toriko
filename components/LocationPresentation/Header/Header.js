import Title from './Title/Title';
import InformationButton from './InformationButton/InformationButton';

import Like from '../../Like/Like';

const Header = ({ location, distance, openings, isOpen, collapseInformations }) => {
	return (
		<div className="w-100">
			<div className="db dib-ns w-50-l w-100-m">
				<div className="flex">
					<Title 
						location={ location } 
						distance={ distance }
						openings={ openings }
						isOpen={ isOpen }
					/>
					<InformationButton collapseInformations={ collapseInformations } />
				</div>
			</div>
			<Like />
		</div>
	);
};

export default Header;