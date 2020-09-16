import LocationMarker from './LocationMarker';

const LocationMarkers = ({ locations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	return (
		<div>
			{
				locations.map((location, index) => 
					location.speciality_id === speciality.id
						? 	<LocationMarker
								key={ index }
								markerIcons={ markerIcons } 
								location={ location }
								isGeolocationEnable={ isGeolocationEnable }
								getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
								userLocation={ userLocation }
							/> 	
						: 	''
				)	
			}
		</div>	
	);
};

export default LocationMarkers;