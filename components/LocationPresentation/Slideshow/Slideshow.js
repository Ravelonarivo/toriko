import { Zoom } from 'react-slideshow-image';

const Slideshow = ({ pictures }) => {
	const zoomInProperties = {
	    indicators: false,
	    scale: 1.4
	};

	return (
		<div>
			<Zoom {...zoomInProperties}>
		    	{
		    		pictures.map((picture, index) => (
		          		<div key={index} style={{ width: '100%', height:'60vh' }}>
		            		<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={ picture.path } />
		          		</div>
		        	))
		        }
		    </Zoom>
		</div>
	);
};

export default Slideshow;