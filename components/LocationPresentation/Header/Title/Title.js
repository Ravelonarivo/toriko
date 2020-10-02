const Title = ({ location, distance, openings, isOpen }) => {
	return (
		<div>
			<h2>
				{ location.name }:&nbsp;
				{
					isOpen(openings) 
						? 	'ouvert'
						: 	'fermé'
				}&nbsp;
				{ distance.length ? distance : '' }
			</h2>
		</div>
	);
};

export default Title;