import Announcement from './Announcement';

import differenceInDays from 'date-fns/differenceInDays';

import utilStyles from '../../styles/utils.module.css';

const AnnouncementList = ({ location, announcements }) => {
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
		<div className={ utilStyles.sticky + ' db-ns dn-m dn bg-white w-30-l vh-75 br--bottom br3 shadow-5' } style={{ marginTop: '-72px', zIndex: '2' }}>
			<h3 className="tc">Annonces</h3>
			<div className="bt bb b--moon-gray pa2" style={{ overflowY: 'auto', height: '27rem' }}>
				{
					announcements.length
						? 	announcements.map((announcement, index) => (
								<div key={ index }>
						       		{
						       			index === 0 || index !== 0 && announcements[index -1].date !== announcement.date
						       				? 	<h6 className="mv0">{ getAnnouncemenDate(announcement) }</h6>
						       				: 	''
						       		}						          	
									<Announcement
										announcement={announcement}
									/>	
								</div>
							))
						: 	<p>{ location.name } n'a publié aucune annonce</p>
				}
			</div>
		</div>
	);
};

export default AnnouncementList;