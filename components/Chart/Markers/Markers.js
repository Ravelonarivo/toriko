import SearchedProductLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedProductLocationMarkers'; 
import SearchedProductTypeLocationMarkers from './LocationMarkers/SearchedItemMarkers/SearchedProductTypeLocationMarkers';
import SearchedDistrictLocationMarker from './LocationMarkers/SearchedItemMarkers/SearchedDistrictLocationMarker';
import LocationMarkers from './LocationMarkers/LocationMarkers';

const Markers = ({ searchFieldValue, townName, productSearch, searchedProduct, productTypeSearch, searchedProductType, districtSearch, searchedDistrict, locationSearch, locations, locationType, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation, saveSearch }) => {		
	return (
		<div>
			{
				productSearch 
					? 	<div>{ console.log('SearchedProductLocationMarkers') }<SearchedProductLocationMarkers
							searchedProduct={ searchedProduct }
							townName={ townName }
							saveSearch={ saveSearch }
							speciality={ speciality }
							markerIcons={ markerIcons }
							isGeolocationEnable={ isGeolocationEnable }
							getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
							userLocation={ userLocation }
						/></div>
					:   ''
			}
			{
				productTypeSearch
					?   <div>{ console.log('SearchedProductTypeLocationMarkers') }<SearchedProductTypeLocationMarkers	
							searchedProductType={ searchedProductType }
							townName={ townName }
							saveSearch={ saveSearch }
							speciality={ speciality }
							markerIcons={ markerIcons }
							isGeolocationEnable={ isGeolocationEnable }
							getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
							userLocation={ userLocation }
						/></div>	
					: 	''
			}
			{
				districtSearch
					?	<div>{ console.log('SearchedDistrictLocationMarkers') }<SearchedDistrictLocationMarker
							searchedDistrict={ searchedDistrict} 
							locationType={ locationType } 
							saveSearch={ saveSearch }
							speciality={ speciality }
						    markerIcons={ markerIcons }
						    isGeolocationEnable={ isGeolocationEnable } 
						    getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
						    userLocation={ userLocation }	
						/></div>
					: 	''
			}
			{
				locationSearch
					? 	<div>{ console.log('SearchedLocationMarkers') }<LocationMarkers
							locations={ locations }
							speciality={speciality}
							markerIcons={markerIcons}
							isGeolocationEnable={isGeolocationEnable}
							getDistanceBetweenLocationAndUserLocation={getDistanceBetweenLocationAndUserLocation}
							userLocation={userLocation}
						/></div>
					: 	''
			}
			{
				!searchFieldValue && !productSearch && !productTypeSearch && !locationSearch && !districtSearch
					? 	<div>{ console.log('LocationMarkers') }<LocationMarkers
							locations={ locations }
							speciality={speciality}
							markerIcons={markerIcons}
							isGeolocationEnable={isGeolocationEnable}
							getDistanceBetweenLocationAndUserLocation={getDistanceBetweenLocationAndUserLocation}
							userLocation={userLocation}
						/></div>
					: 	''		
			}
		</div>
	);
};

export default Markers;