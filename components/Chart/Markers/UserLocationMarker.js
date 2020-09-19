import { Marker } from 'react-leaflet';
import GetCurrentLocationButton from '../GetCurrentLocationButton/GetCurrentLocationButton';

const UserLocationMarker = ({ isGeolocationEnable, geolocIcon, userLocation, getCurrentLocation  }) => {
	return (
		<div>
			{
				isGeolocationEnable 
					? 	<div>
							<Marker icon={ geolocIcon } position={ userLocation } />
							<GetCurrentLocationButton getCurrentLocation={ getCurrentLocation } />
						</div>
					: 	''
			}
		</div> 
	);
};

export default UserLocationMarker;