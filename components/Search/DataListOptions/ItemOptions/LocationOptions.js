const LocationOptions = ({ searchFieldValue, locations }) => {
	return (
		<div>
			{
				searchFieldValue
					?	locations.map((location, index) => (
							<option value={ location.name } key={ index }>{ location.type }</option>
						))
					:   ''
			}
		</div>
	);
};

export default LocationOptions;