import { Zoom } from 'react-slideshow-image';

const Slideshow = () => {
	const images = [
		'/location/pictures/5/1.jpg',
	  	'/location/pictures/5/2.jpg',
	  	'/location/pictures/5/3.jpg'
	];

	const zoomInProperties = {
	    indicators: false,
	    scale: 1.4
	};

	return (
		<div>
			<Zoom {...zoomInProperties}>
		    	{images.map((each, index) => (
		          <div key={index} style={{ width: '100%', height:'60vh' }}>
		            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={each} />
		          </div>
		        ))}
		    </Zoom>
		</div>
	);
};

export default Slideshow;