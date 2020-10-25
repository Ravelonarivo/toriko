import { formatText } from '../../../lib/functions';

import Image from '../../Image/Image'; 

const Announcement = ({ announcement, openPopup }) => {
	return (
		<div 
			className="w-100 flex mb2 br1 h3 pa1 shadow-4 pointer shadow-hover"
			onClick={ () => openPopup(announcement, 'announcement') }
		>
			{
				announcement.image 
					? 	<Image 
							image={ announcement.image }
							imageStyle="w3 mr1 grow"
						/>
					: 	''
			}
			<div className={ announcement.image ? 'w-70' : 'w-100' }>
				<h5 className="mv0">{ announcement.title }</h5>
				<p className="mv1 f7 lh-title">{ formatText(announcement.detail, 46) }</p>
			</div>
		</div>
	);
};

export default Announcement;