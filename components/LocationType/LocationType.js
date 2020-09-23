const LocationType = ({ locationType }) => {
	return (
		<option value={ locationType.name }>
			{ locationType.name }
		</option>
	);
};
	
export default LocationType;

