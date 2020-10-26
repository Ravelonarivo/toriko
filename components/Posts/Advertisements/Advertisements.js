import { Slide } from 'react-slideshow-image';

import MdPause from 'react-ionicons/lib/MdPause';
import MdPlay from 'react-ionicons/lib/MdPlay';

import { useState } from 'react';

const Advertisements = ({ advertisements, announcementsLength }) => {
	const [autoplay, setAutoplay] = useState(true);

	const toggleSlide = () => {
		autoplay ? setAutoplay(false) : setAutoplay(true);
	};

	const slideProperties = {
		indicators: false,
		duration: 10000,
		easing: 'ease'
	};

	return (
		<div className={ advertisements.length ? 'mv0' : 'dn'  }>
			<Slide { ...slideProperties } autoplay={ autoplay }>
				{
		    		advertisements.map((advertisement, index) => (
		          		<div key={index} style={{ width: '100%', height: announcementsLength ? '21rem' : '34rem' }}>
		            		<img style={{ objectFit: 'fill', width: '100%', height: '100%' }} src={ advertisement.image } />
		          		</div>
		        	))
		        }
			</Slide>
			<div className="flex justify-center mv1" title={ autoplay ? 'pause' : 'play' }>
				{
					autoplay
						?	<MdPause 
								fontSize="20px"
								className="pointer dim"
								onClick={ toggleSlide }
							/>
						: 	<MdPlay
								fontSize="20px"
								className="pointer dim"
								onClick={ toggleSlide }
							/>	
				}
			</div>
		</div>
	);
};

export default Advertisements;