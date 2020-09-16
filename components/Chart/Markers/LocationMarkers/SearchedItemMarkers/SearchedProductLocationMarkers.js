import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../../lib/fetcher';
import LocationMarkers from '../LocationMarkers';

const SearchedProductLocationMarkers = ({ searchedProduct, townName, getSearchedLocations, saveSearch, setProductSearchToFalse, locations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	useEffect(() => {
		if (data) {
			getSearchedLocations(data);
			saveSearch(data, 'product');
			setProductSearchToFalse(false);
		}
	});	

	const [product] = searchedProduct;
	// Get locations by product's name and town's name
	const { data } = useSWR(`/api/location_product_town/${ product.name }/${ townName }`, fetcher);

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

export default SearchedProductLocationMarkers;