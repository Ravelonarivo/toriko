import Announcement from './Announcement';

const AnnouncementList = ({ location, announcements }) => {
	return (
		<div className="db-ns dn-m dn bg-white w-30-l vh-100 br3 shadow-5">
			<h3 className="tc">Annonces</h3>
			<div className="bt b--light-silver pa2">
				{
					announcements.length
						? 	announcements.map((announcement, index) => (
								<Announcement
									index={index}
									announcement={announcement}
								/>	
							))
						: 	<p>{ location.name } n'a publié aucune annonce</p>
				}
			</div>
		</div>
	);
};

export default AnnouncementList;