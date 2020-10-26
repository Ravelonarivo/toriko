import CloseButton from '../../CloseButton/CloseButton';
import Image from '../../Image/Image';

import MdMegaphone  from 'react-ionicons/lib/MdMegaphone';

import { getAnnouncemenDate } from '../../../lib/functions';

const Announcement = ({ announcement, closeButtonRef, close, visibilityAndOpacity }) =>  {
	return (
		<div className="w-100 h-100" style={{ ...visibilityAndOpacity }}>
			<div className="flex items-center pa1 bb b--moon-gray">
				<h3 className="mv0 tc w-100">{ announcement.title }</h3>
				<CloseButton
					closeButtonRef={ closeButtonRef }
					close={ close }
					closeButtonDisplay='db'
				/>
			</div>
			{
				announcement.image
					? <Image
						image={ announcement.image }
						imageStyle="w-100 h-50"
					/>
					: <MdMegaphone style={{ width: '100%', height: '49%' }} />
			}
			<div style={{ height: '33%' }}>
				<div className="tc mv1">
					<span>
						Publiée le&nbsp;
						<span className="b">{ getAnnouncemenDate(announcement) }</span>
					</span>
				</div>
				<div className="f6 lh-title bt bb b--moon-gray pa2 h-100" style={{ overflowY: 'auto' }}>
					<p className="mv0">{ announcement.detail }</p>
				</div>
			</div>
		</div> 		
	); 
};

export default Announcement;