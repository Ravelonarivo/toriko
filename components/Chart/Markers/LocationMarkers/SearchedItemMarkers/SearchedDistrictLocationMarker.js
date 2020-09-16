import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../../lib/fetcher';
import LocationMarkers from '../LocationMarkers';

const SearchedDistrictLocationMarker = ({ searchedDistrict, setDistrictSearchToFalse, getMapCenter, locationType, getSearchedLocations, saveSearch, locations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	useEffect(() => {
		if (data && district) {
			getSearchedLocations(data);
			saveSearch(data, 'district', [district]);
			// Recenter the map at the searched district
			getMapCenter(district);
			setDistrictSearchToFalse(false);
		}
	});
		
	const [district] = searchedDistrict;
	// Get locations by district's id and location's type id
	const { data } = locationType
		? useSWR(`/api/location_district_locationType/${district.id}/${locationType.id}`, fetcher)
		: useSWR(`/api/location_district_locationType/${district.id}`, fetcher);

	return (
		<div>
			<LocationMarkers
				locations={ locations }
				speciality={ speciality }
				markerIcons={ markerIcons }
				isGeolocationEnable={ isGeolocationEnable }
				getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
				userLocation={ userLocation }
			/>
		</div>
	);
};

export default SearchedDistrictLocationMarker;
