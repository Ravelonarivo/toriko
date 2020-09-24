import LocationMarker from './LocationMarker';

const LocationMarkers = ({ townName, locations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	return (
		<div>
			{
				locations.length 
					?
						locations.map((location, index) => 
							location.speciality_id === speciality.id
								? 	<LocationMarker
										key={ index }
										markerIcons={ markerIcons }
										townName={ townName }  
										location={ location }
										isGeolocationEnable={ isGeolocationEnable }
										getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
										userLocation={ userLocation }
									/> 	
								: 	''
						)
					: ''	
			}
		</div>	
	);
};

export default LocationMarkers;