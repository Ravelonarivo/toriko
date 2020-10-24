const Image = ({ image }) => { 
	return (
		<div className="w4 grow">
			<img className="w-100 h-100 br1" src={ image } />
		</div>
	);          
};

export default Image;