import { Slide } from 'react-slideshow-image';

const Advertisements = ({ advertisements, announcementsLength }) => {
	const slideProperties = {
		indicators: false,
		duration: 10000,
		easing: 'ease'
	};

	return (
		<div className={ advertisements.length ? 'mb1' : 'dn'  }>
			<Slide { ...slideProperties }>
				{
		    		advertisements.map((advertisement, index) => (
		          		<div key={index} style={{ width: '100%', height: announcementsLength ? '21rem' : '34rem' }}>
		            		<img style={{ objectFit: 'fill', width: '100%', height: '100%' }} src={ advertisement.image } />
		          		</div>
		        	))
		        }
			</Slide>
		</div>
	);
};

export default Advertisements;