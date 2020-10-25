const Image = ({ image, imageStyle }) => { 
	return (
		<div className={ imageStyle }>
			<img className="w-100 h-100 br1" src={ image } />
		</div>
	);          
};

export default Image;