import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../../lib/fetcher';
import LocationMarkers from '../LocationMarkers';

const SearchedProductLocationMarkers = ({ searchedProduct, townName, saveSearch, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation }) => {
	useEffect(() => {
		if (data) saveSearch(data, 'product', [product]);
	});	

	const [product] = searchedProduct;
	// Get locations by product's name and town's name
	const { data } = useSWR(`/api/location_product_town/${ product.name }/${ townName }`, fetcher);

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

export default SearchedProductLocationMarkers;