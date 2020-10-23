import MdStarOutline from 'react-ionicons/lib/MdStarOutline';
import MdStar from 'react-ionicons/lib/MdStar';

import { useState } from 'react';

const FavoriteButton = () => {
	const [bookMarked, setBookMarked] = useState(false);

	const bookMark = () => {
		bookMarked
			? setBookMarked(false)
			: setBookMarked(true);
	};

	return (
		<div className="ml2 flex items-center" title="ajouter aux favoris">
			{
				bookMarked
					?	<MdStar 
							fontSize="36px"
							color="#ffc107"
							style={{ cursor: 'pointer' }}
							onClick={ bookMark }
						/>
					: 	<MdStarOutline 
							fontSize="36px"
							color="#ffc107"
							style={{ cursor: 'pointer' }}
							onClick={ bookMark }
						/>
			}
		</div>
	);
};

export default FavoriteButton;