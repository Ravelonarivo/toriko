import Announcement from './Announcement';

import { getAnnouncemenDate } from '../../../lib/functions';

const AnnouncementList = ({ announcements, advertisementsLength, openPopup }) => {
	return (
		<div className={ announcements.length ? 'bt bb b--moon-gray pa2' : 'dn'  } style={{ overflowY: 'auto', height: advertisementsLength ? '12rem' : '34rem' }}>
			{
				announcements.map((announcement, index) => (
					<div key={index}>
						{
							index === 0 || index !== 0 && announcements[index - 1].date !== announcement.date
								? <h6 className="mv0">{ getAnnouncemenDate(announcement) }</h6>
								: ''
						}
						<Announcement
							announcement={ announcement }
							openPopup={ openPopup }
						/>
					</div>
				))		
			}
		</div>
	);
};

export default AnnouncementList;