import MdHeartOutline from 'react-ionicons/lib/MdHeartOutline';
import MdHeart from 'react-ionicons/lib/MdHeart';

import { useState } from 'react';

const LikeButton = () => {
	const [liked, setLiked] = useState(false);
	const [numberOfLikes, setNumberOfLikes] = useState(0);

	const like = () => {
		if (liked) {
			setLiked(false);
			setNumberOfLikes(numberOfLikes => numberOfLikes - 1);
		} else {
			setLiked(true);
			setNumberOfLikes(numberOfLikes => numberOfLikes + 1);
		}  
	};

	return (
		<div  title="liker">
      		<label 
      			className="dib mr2 red" 
      			style={{ transform: 'translateY(-2px)', fontSize: '2rem' }}
      		>
      			{ numberOfLikes }
      		</label>
      		{
      			liked 
      				?	<MdHeart 
			      			fontSize="30px" 
			      			color="#ff4136"
			      			style={{ cursor: 'pointer'}}
			      			onClick={ like }
			      		/>
      				: 	<MdHeartOutline 
			      			fontSize="30px" 
			      			color="#ff4136"
			      			style={{ cursor: 'pointer'}}
			      			onClick={ like }
			      		/> 	
      		}
		</div>
	);
};

export default LikeButton;