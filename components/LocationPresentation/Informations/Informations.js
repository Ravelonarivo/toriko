import Information from './Information/Information';
import Opening from './Opening/Opening';

import { Collapse } from 'react-collapse';
import VisibilitySensor from 'react-visibility-sensor';

const Informations = ({ location, openings, isInformationsOpened, collapseInformationsByVisibility }) => {
	return (	
		<VisibilitySensor partialVisibility={ true }  onChange={ collapseInformationsByVisibility }>
			<Collapse isOpened={ isInformationsOpened } initialStyle={{ height: 'auto', overflow: 'initial', transition: 'height 500ms' }}>
				<div className="dib w-100">
					<Information location={location} />
					<Opening openings={openings} />
				</div>
			</Collapse>
		</VisibilitySensor>
	);
};

export default Informations;