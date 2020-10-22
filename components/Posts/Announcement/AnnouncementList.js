import Announcement from './Announcement';

import differenceInDays from 'date-fns/differenceInDays';

const AnnouncementList = ({ announcements, advertisementsLength }) => {
	const getAnnouncemenDate = announcement => {
		// Date in millisecond
		let date = new Date(parseInt(announcement.date));
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		const today = new Date();
		const difference = differenceInDays(
		  new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
		  new Date(year, month, day)
		);

		if (difference === 0) {
			date = "Aujourd'hui";
		} else if (difference === 1) {
			date = "Hier";
		} else {
			date = `${ day }/${ month }/${ year }`;
		}

		return date;
	};

	return (
		<div className={ announcements.length ? 'bt bb b--moon-gray pa2' : 'dn'  } style={{ overflowY: 'auto', height: advertisementsLength ? '16rem' : '34rem' }}>
			{
				announcements.map((announcement, index) => (
					<div key={index}>
						{
							index === 0 || index !== 0 && announcements[index - 1].date !== announcement.date
								? <h6 className="mv0">{getAnnouncemenDate(announcement)}</h6>
								: ''
						}
						<Announcement
							announcement={announcement}
						/>
					</div>
				))		
			}
		</div>
	);
};

export default AnnouncementList;