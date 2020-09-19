import { useEffect } from 'react';
import LocationMarkers from '../LocationMarkers';

const SearchedLocationMarker = ({ searchedLocation, saveSearch, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, getSearchedLocations, userLocation }) => {
	useEffect(() => {
		getSearchedLocations(searchedLocation);
		saveSearch(searchedLocation, 'location');
	});

	return (
		<div>
			<LocationMarkers
				locations={ searchedLocation }
				speciality={ speciality }
				markerIcons={ markerIcons }
				isGeolocationEnable={ isGeolocationEnable }
				getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
				userLocation={ userLocation }
			/>
		</div>
	);
};

export default SearchedLocationMarker;