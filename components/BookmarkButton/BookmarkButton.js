import IosBookmarkOutline from 'react-ionicons/lib/IosBookmarkOutline';
import IosBookmark from 'react-ionicons/lib/IosBookmark';

import { useState } from 'react';

const BookmarkButton = () => {
	const [isBookmarked, setIsBookmarked] = useState(false);

	const bookMark = () => {
		isBookmarked
			? setIsBookmarked(false)
			: setIsBookmarked(true);
	};

	return (
		<div title="marquer" style={{ height: '28px' }}>
			{
				isBookmarked
					?	<IosBookmark
							fontSize="28px"
							style={{ cursor: 'pointer' }}
							onClick={ bookMark }
						/>	
					: 	<IosBookmarkOutline 
							fontSize="28px"
							style={{ cursor: 'pointer' }}
							onClick={ bookMark }
						/> 
			}
		</div>
	);
};

export default BookmarkButton;