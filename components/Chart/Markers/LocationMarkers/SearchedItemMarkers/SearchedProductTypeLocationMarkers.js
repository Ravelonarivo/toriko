import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../../lib/fetcher';
import LocationMarkers from '../LocationMarkers';

const SearchedProductTyLocationMarkers = ({ searchedProductType, townName,  getSearchedLocations, saveSearch, setProductTypeSearchToFalse, locations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	useEffect(() => {
		if (data) {
			getSearchedLocations(data);
			saveSearch(data, 'productType');
			setProductTypeSearchToFalse(false);
		}
	});

	const [productType] = searchedProductType;
	// Get locations by product's type name and town's name
	const { data } = useSWR(`/api/location_productType_town/${ productType.name }/${ townName }`, fetcher);
	
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

export default SearchedProductTyLocationMarkers;