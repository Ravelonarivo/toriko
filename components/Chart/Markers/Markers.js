import SearchedProductLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedProductLocationMarkers'; 
import SearchedProductTypeLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedProductTypeLocationMarkers';
import SearchedDistrictLocationMarker from './LocationMarkers/SearchedItemMarkers/SearchedDistrictLocationMarker';
import LocationMarkers from './LocationMarkers/LocationMarkers';

const Markers = ({ townName, getSearchedLocations, productSearch, searchedProduct, setProductSearchToFalse, productTypeSearch, searchedProductType, setProductTypeSearchToFalse, districtSearch, searchedDistrict, locations, locationType, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation, saveSearch }) => {		
	return (
		<div>
			{
				productSearch 
					? 	<SearchedProductLocationMarkers
							searchedProduct={ searchedProduct }
							townName={ townName }
							getSearchedLocations={ getSearchedLocations }
							saveSearch={ saveSearch }
							setProductSearchToFalse={ setProductSearchToFalse }
							locations={ locations }
							speciality={ speciality }
							markerIcons={ markerIcons }
							isGeolocationEnable={ isGeolocationEnable }
							getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
							userLocation={ userLocation }
						/>
					:   ''
			}
			{
				productTypeSearch
					?   <SearchedProductTypeLocationMarkers	
							searchedProductType={ searchedProductType }
							townName={ townName }
							getSearchedLocations={ getSearchedLocations }
							saveSearch={ saveSearch }
							setProductTypeSearchToFalse={ setProductTypeSearchToFalse }
							locations={ locations }
							speciality={ speciality }
							markerIcons={ markerIcons }
							isGeolocationEnable={ isGeolocationEnable }
							getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
							userLocation={ userLocation }
						/>	
					: 	''
			}
			{
				districtSearch
					?	<SearchedDistrictLocationMarker
							searchedDistrict={ searchedDistrict} 
							locationType={ locationType } 
							getSearchedLocations={ getSearchedLocations }
							saveSearch={ saveSearch }
							locations={ locations }
							speciality={ speciality }
						    markerIcons={ markerIcons }
						    isGeolocationEnable={ isGeolocationEnable } 
						    getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
						    userLocation={ userLocation }	
						/>
					: 	''
			}
			{
				!productSearch && !productTypeSearch && !districtSearch
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