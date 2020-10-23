import MdStarOutline from 'react-ionicons/lib/MdStarOutline';
import MdStar from 'react-ionicons/lib/MdStar';

import { useState } from 'react';

const FavoriteButton = () => {
	const [isFavorite, setIsFavorite] = useState(false);

	const addToFavorite = () => {
		isFavorite
			? setIsFavorite(false)
			: setIsFavorite(true);
	};

	return (
		<div className="ml2 flex items-center" title="ajouter aux favoris">
			{
				isFavorite
					?	<MdStar 
							fontSize="36px"
							color="#ffc107"
							style={{ cursor: 'pointer' }}
							onClick={ addToFavorite }
						/>
					: 	<MdStarOutline 
							fontSize="36px"
							color="#ffc107"
							style={{ cursor: 'pointer' }}
							onClick={ addToFavorite }
						/>
			}
		</div>
	);
};

export default FavoriteButton;