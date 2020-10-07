const Image = ({ image }) => { 
	return (
		<div className="w4">
			<img className="w-100 h-100 br1" src={ image } />
		</div>
	);          
};

export default Image;