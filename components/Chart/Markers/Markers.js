import SearchedProductLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedProductLocationMarkers'; 
import SearchedProductTypeLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedProductTypeLocationMarkers';
import SearchedDistrictLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedDistrictLocationMarkers';
import SearchedLocationMarker from './LocationMarkers/SearchedItemMarkers/SearchedLocationMarker';
import LocationMarkers from './LocationMarkers/LocationMarkers';

const Markers = ({ searchFieldValue, townName, productSearch, searchedProduct, productTypeSearch, searchedProductType, districtSearch, searchedDistrict, locationSearch, searchedLocation, locations, locationType, getSearchedLocations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation, saveSearch }) => {		
	return (
		<div>
			{
				productSearch 
					? 	<SearchedProductLocationMarkers
							searchedProduct={ searchedProduct }
							townName={ townName }
							saveSearch={ saveSearch }
							speciality={ speciality }
							markerIcons={ markerIcons }
							isGeolocationEnable={ isGeolocationEnable }
							getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
							getSearchedLocations={ getSearchedLocations }
							userLocation={ userLocation }
						/>
					:   ''
			}
			{
				productTypeSearch
					?   <SearchedProductTypeLocationMarkers	
							searchedProductType={ searchedProductType }
							townName={ townName }
							saveSearch={ saveSearch }
							speciality={ speciality }
							markerIcons={ markerIcons }
							isGeolocationEnable={ isGeolocationEnable }
							getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
							getSearchedLocations={ getSearchedLocations }
							userLocation={ userLocation }
						/>	
					: 	''
			}
			{
				districtSearch
					?	<SearchedDistrictLocationMarkers
							searchedDistrict={ searchedDistrict} 
							locationType={ locationType } 
							saveSearch={ saveSearch }
							speciality={ speciality }
						    markerIcons={ markerIcons }
						    isGeolocationEnable={ isGeolocationEnable } 
						    getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
						    getSearchedLocations={ getSearchedLocations }
						    userLocation={ userLocation }	
						/>
					: 	''
			}
			{
				locationSearch
					? 	<SearchedLocationMarker
							searchedLocation={ searchedLocation }
							saveSearch={ saveSearch }
							speciality={speciality}
							markerIcons={markerIcons}
							isGeolocationEnable={isGeolocationEnable}
							getDistanceBetweenLocationAndUserLocation={getDistanceBetweenLocationAndUserLocation}
							getSearchedLocations={ getSearchedLocations }
							userLocation={userLocation}
						/>
					: 	''
			}
			{
				!searchFieldValue && !productSearch && !productTypeSearch && !locationSearch && !districtSearch
					? 	<LocationMarkers
							locations={ locations }
							speciality={speciality}
							markerIcons={markerIcons}
							isGeolocationEnable={isGeolocationEnable}
							getDistanceBetweenLocationAndUserLocation={getDistanceBetweenLocationAndUserLocation}
							userLocation={userLocation}
						/>
					: 	''		
			}
		</div>
	);
};

export default Markers;