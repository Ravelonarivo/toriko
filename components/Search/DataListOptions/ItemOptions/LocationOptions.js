const LocationOptions = ({ locations }) => {
	return (
		<div>
			{
				locations.map((location, index) => (
					<option value={ location.name } key={ index }>{ location.type }</option>
				))
			}
		</div>
	);
};

export default LocationOptions;