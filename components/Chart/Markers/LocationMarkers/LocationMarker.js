import { Marker, Popup } from 'react-leaflet';
import Link from 'next/link';

import  { useState, useEffect } from 'react';

const LocationMarker = ({ markerIcons, townName, location, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	const [distance, setDistance] = useState('');

	useEffect(() => {
		const distance = isGeolocationEnable
			? getDistanceBetweenLocationAndUserLocation(location, userLocation)
			: '';
		if (distance.length) setDistance(distance);
	}, [isGeolocationEnable]);

	return (
		<div>
			<Marker 
				icon={markerIcons[location.type]}
				position={[location.lat, location.long]}
			>
				<Popup autoPan={false}>
					<Link href="/presentation/[...param]" as={`/presentation/${ location.slug }/${townName}`}>
						<a>
							{ location.name}&nbsp;{ distance }
						</a>
					</Link>
				</Popup>
			</Marker>
		</div>
	);
};

export default LocationMarker;