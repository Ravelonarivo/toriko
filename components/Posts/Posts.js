import AnnouncementList from './Announcement/AnnouncementList';
import Advertisements from './Advertisements/Advertisements';

import utilStyles from '../../styles/utils.module.css';

import { useState } from 'react';

const Posts = ({ location, advertisements, announcements, openPopup }) => {
	return (
		<div className={ utilStyles.sticky + ' db-ns dn-m dn bg-white w-30-l br--bottom br3 shadow-5' } style={{ marginTop: '-72px', zIndex: '2', height: '40rem' }}>
			<h3 className="tc">Publicités/Annonces</h3>	
			<Advertisements
				advertisements={ advertisements }
				announcementsLength={ announcements.length }
				openPopup={ openPopup }
			/>
			<AnnouncementList
				announcements={ announcements }
				advertisementsLength={ advertisements.length }
				openPopup={ openPopup }
			/>
			{
				announcements.length === 0 && advertisements.length === 0
					? 	<p className='bt b--moon-gray pt4 ph2 tc'>{ location.name } n'a publié ni annonces, ni publicités</p>
					: 	''
			}
		</div>
	);
};

export default Posts;