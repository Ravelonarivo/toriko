import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../../lib/fetcher';
import LocationMarkers from '../LocationMarkers';

const SearchedDistrictLocationMarker = ({ searchedDistrict, locationType, saveSearch, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	useEffect(() => {
		if (data && district) saveSearch(data, 'district', [district]);
	});
		
	const [district] = searchedDistrict;
	// Get locations by district's id and location's type id
	const { data } = locationType
		? useSWR(`/api/location_district_locationType/${district.id}/${locationType.id}`, fetcher)
		: useSWR(`/api/location_district_locationType/${district.id}`, fetcher);

	return (
		<div>
			<LocationMarkers
				locations={ data ? data : '' }
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
