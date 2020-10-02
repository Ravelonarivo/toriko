import Information from './Information/Information';
import Opening from './Opening/Opening';

import { Collapse } from 'react-collapse';

const Informations = ({ location, openings, isInformationsOpened }) => {
	return (	
		<div>
			<Collapse isOpened={ isInformationsOpened } initialStyle={{ height: 'auto', overflow: 'initial', transition: 'height 500ms' }}>
				<div className="dib w-100">
					<Information location={location} />
					<Opening openings={openings} />
				</div>
			</Collapse>
		</div>
	);
};

export default Informations;