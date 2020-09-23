import LocationType from './locationType';
const LocationTypes = ({ locationTypes, townName, locationTypeName, selectLocationType }) => {
	return (
		<div>
			<select className="w5 mr2" value={ locationTypeName } onChange={ selectLocationType }>
				<option value={ `Que cherchez vous à ${ townName } ?`} disabled hidden>Que cherchez vous à { townName } ? </option>
				{
					locationTypes.map((locationType, index) => (
						<LocationType 
							locationType={ locationType }
							key={ index }
						/>
					))
				}
				
				<option 
					value="afficher-tout" 
				>
					afficher tout
				</option>
			</select>
		</div>
	);
};

export default LocationTypes;