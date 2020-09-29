import { Marker, Popup } from 'react-leaflet';
import Link from 'next/link';

const LocationMarker = ({ markerIcons, townName, location, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	return (
		<div>
			<Marker 
				icon={markerIcons[location.type]}
				position={[location.lat, location.long]}
			>
				<Popup autoPan={false}>
					<Link href="/presentation/[...param]" as={`/presentation/${ location.slug }/${townName}`}>
						<a>
							{
								location.name}&nbsp;																			      									{
								isGeolocationEnable
									? getDistanceBetweenLocationAndUserLocation(location, userLocation)
									: ''
							}
						</a>
					</Link>
				</Popup>
			</Marker>
		</div>
	);
};

export default LocationMarker;