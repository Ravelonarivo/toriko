import { Map } from 'react-leaflet-universal';
import { TileLayer, Marker, LayersControl, LayerGroup } from 'react-leaflet';
import { usePosition } from 'use-position';
import { icon } from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import { getDistance, convertDistance } from 'geolib';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';

import { MAP } from '../../lib/constants';

import Markers from './Markers/Markers';
import UserLocationMarker from './Markers/UserLocationMarker';

const Chart = ({ townProp, townName, searchFieldValue, locationTypes, locationTypeName, locations, locationType, getSearchedLocations, locationSearch, setLocationSearchToFalse, districtSearch, searchedDistrictProp, setDistrictSearchToFalse, productSearch, searchedProduct, setProductSearchToFalse, productTypeSearch, searchedProductType, setProductTypeSearchToFalse, saveSearch }) => {
	const [userLocation, setUserLocation] = useState([]);
	const [mapCenter, setMapCenter] = useState([]);
	const [mapZoom, setMapZoom] = useState(MAP.INIT_ZOOM);
	const [geolocIcon, setGeoLocIcon] = useState('');
	const [markerIcons, setMarkerIcons] = useState({});
	const [isGeolocationEnable, setIsGeolocationEnable] = useState(false);
	const [specialities, setSpecialities] = useState([]);

	const layerControlRef = useRef(null);


	const getLocationIds = () => {
		return locations.map(location => location.id);
	};

	/**
	* Get the list of locations speciality 
	* stringify the result of getLocationIds because it's an array of ids
	*/
	const locationIds = JSON.stringify(getLocationIds());
	const { data } = useSWR(`/api/speciality_location/${ locationIds }`, fetcher);

    const getMarkerIcon = type => {
		switch(type) {
			case 'restaurant' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.restoIcon; break;
			case 'fast-food' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.fastfoodIcon; break;
			case 'traiteur' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.traiteurIcon; break;
			case 'hotel' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.hotelIcon; break;
		}

		return icon(MAP.ICON_PROPERTIES);
	} 

	const getGeolocIcon = () => {
		MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.geolocIcon;
		return icon(MAP.ICON_PROPERTIES);
	}

	const getMarkerIcons = () => {
		let markerIcons = {}
		locationTypes.forEach(item => {
			markerIcons = { ...markerIcons, ...{ [item.name]: getMarkerIcon(item.name) } }
		});

		return markerIcons;
	}

	const watch = true;
	const {
		latitude,
		longitude,
		timestamp,
		accuracy,
		error,
	} = usePosition(watch, {enableHighAccuracy: true}); 

	useEffect(() => {
		const [town] = townProp;
		
		// Test if there is a saved location search. If there is, locationSearch is true 
		if (locationSearch) {
			const [savedLocation] = locations;
			setMapCenter([savedLocation.lat, savedLocation.long]);
			setLocationSearchToFalse();
		// Test if there is a saved district search. If there is, districtSearch is true 
		} else if (districtSearch) {
			const [savedSearchedDistrict] = searchedDistrictProp;
			setMapCenter([savedSearchedDistrict.lat, savedSearchedDistrict.long]);
			setDistrictSearchToFalse();
		// If there is no saved search or the saved search is not about a location or a district 
		} else {	
			setMapCenter([town.latitude, town.longitude]);
		}

		if (locationTypeName === 'afficher-tout') {
			// Get all markers icon
			setMarkerIcons(getMarkerIcons());
		} else {
			// Get the corresponding icon e.g hotel icon 
			setMarkerIcons({ [locationTypeName]: getMarkerIcon(locationTypeName) });
		} 
		
		setGeoLocIcon(getGeolocIcon());
	}, []);

	useEffect(() => {
		if (data) setSpecialities(data);
	},[data, specialities]);

	useEffect(() => {
		// Get the user location if geolocation is enable
		if (error === null && latitude	&& longitude) {
			setIsGeolocationEnable(true);
			setUserLocation([latitude, longitude]);
		}
	}, [latitude, longitude]),

	useEffect(() => {
		// If there is a location search, recenter the map at the searched location
		if (locationSearch && locations.length) {
			const [location] = locations;
			setMapCenter([location.lat, location.long]);
			/**
			* To avoid infinite loop, the previous locationSearch value must be different to the current value 
			* that's why locationSearch must be set to false after the mapCenter updated with the 
			* lat and long of the searched location 
			*/
			setLocationSearchToFalse();
		}
	}, [locationSearch, locations]);

	useEffect(() => {
		/**
		* Recenter the map at the searched district
		* To avoid the bug: unmatched locations still display when the map is recentered on the searched district geolocation	
		* wait 1000ms to let getLocationsByDistrictIdAndLocationTypeId get the locations before recenter the map
		*/
		if (districtSearch && searchedDistrictProp.length) {
			setTimeout(() => {
				const [searchedDistrict] = searchedDistrictProp;
				setMapCenter([searchedDistrict.lat, searchedDistrict.long]);
				setDistrictSearchToFalse();
			}, 1000);
		}
	}, [districtSearch, searchedDistrictProp]);

	useEffect(() => {
		// If there is specialitesFilterState saved in the locolStorage, not collapse the LayersControl 
		if (layerControlRef.current && localStorage.getItem('specialitiesFilterState')) {
			layerControlRef.current.leafletElement.expand();
		}
	}, [mapCenter, mapZoom, layerControlRef.current, searchFieldValue]);


	/**
	* mapCenter and mapZoom state must be updated with the current center and  the current zoom while the user drag or zoom 
	* the map. These states are updated with userLocation and initZoom when the user clicks on "afficher votre localisation"
	*/

	/**
	* Run when the user drags the map
	* Link to Map component onMoveEnd event  
	*/ 
	const updateCurrentCenter = event => {
		const mapCenter = event.target.getCenter();
		setMapCenter(mapCenter);
	};

	/**
	* Run when the user zooms the map  
	* Link to Map component onZoomEnd  event
	*/
	const updateCurrentZoom = event => {
		const mapZoom = event.target.getZoom();
		setMapZoom(mapZoom);
	}

	/**
	* Run when the user clicks on "afficher votre localisation"
	*/
	const getCurrentLocation = () => {
		setMapCenter(userLocation); 
		setMapZoom(MAP.INIT_ZOOM);
	}

	const getDistanceBetweenLocationAndUserLocation = (location, userLocation) => {
		const [latitude, longitude] = userLocation;
		const distance = getDistance({latitude: location.lat, longitude: location.long}, { latitude, longitude });
		return distance >= 1000 
			? '(' + convertDistance(distance, 'km').toFixed(1) + 'km)'
			: '(' + distance + 'm)'
	}

	const saveSpecialitiesFilterState = () => { 
		if (layerControlRef.current) {
			const specialitiesChecking =  layerControlRef.current.leafletElement._layerControlInputs.map(layerControlInput => layerControlInput.checked);	
			const specialitiesName =  layerControlRef.current.leafletElement._layers.map(layer => layer.name);
			const specialities = specialitiesName.map((specialityName, index) => ({ name: specialityName, checked: specialitiesChecking[index] }));	
			// If there are some unchecked checkbox at the LayersControl save specialitiesFilterState in the localStorage    
			if (specialities.some(speciality => speciality.checked === false)) {
				localStorage.setItem('specialitiesFilterState', JSON.stringify(specialities));
			} else {
				localStorage.removeItem('specialitiesFilterState');
			}
		}   
	}

	// Check or uncheck the LayersControl.Overlay depending of the informations saved in the specialitiesFilterState
	const checkedLayersControlOverlay = specialityName => {
		let isChecked = true;
		const savedSpecialitiesFilterState = JSON.parse(localStorage.getItem('specialitiesFilterState'));
		if (savedSpecialitiesFilterState) {
			for (const savedSpecialityFilterState of savedSpecialitiesFilterState) {
				if (savedSpecialityFilterState.name === specialityName && !savedSpecialityFilterState.checked) {
					isChecked = false;
					break;
				}
			}
		}

		return isChecked;
	}
	
	return ( 
		<div>
			<Map 
				onMoveEnd={ updateCurrentCenter } 
				onZoomEnd={ updateCurrentZoom } 
				center={ mapCenter } zoom={ mapZoom } 
				style={{ height: '83vh', width: '100%' }}
			> 
				<LayersControl position="bottomleft" ref={ layerControlRef }>
					<TileLayer                 
					    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					{ 
					    specialities.map((speciality) => (
					    	<LayersControl.Overlay name={ speciality.name } key={ speciality.name } checked={ checkedLayersControlOverlay(speciality.name) }>
					    		<LayerGroup 
					    			onRemove={ saveSpecialitiesFilterState }
					    			onAdd={ saveSpecialitiesFilterState }
					    		>
					    			<Markers
					    				townName={ townName }
					    				getSearchedLocations={ getSearchedLocations }

					    				productSearch={ productSearch}
					    				searchedProduct={ searchedProduct }
					    				setProductSearchToFalse={ setProductSearchToFalse }
					    				
					    				productTypeSearch={ productTypeSearch }
					    				searchedProductType={ searchedProductType }
					    				setProductTypeSearchToFalse={ setProductTypeSearchToFalse }		
					    				
					    				districtSearch={ districtSearch }
					    				searchedDistrict={ searchedDistrictProp }
					    				setDistrictSearchToFalse={ setDistrictSearchToFalse }
					    				
					    				locations={ locations }
					    				locationType={ locationType }
					    				speciality={ speciality }
					    				markerIcons={ markerIcons }
					    				isGeolocationEnable={ isGeolocationEnable }
					    				getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
					    				userLocation={ userLocation }
					    			
					    				saveSearch={ saveSearch }
					    			/>  
					    		</LayerGroup>
					    	</LayersControl.Overlay>
					    ))
					}
				</LayersControl>

				<UserLocationMarker
					isGeolocationEnable={ isGeolocationEnable }
					geolocIcon={ geolocIcon }
					userLocation={ userLocation }
					getCurrentLocation={ getCurrentLocation }
				/>
	  		</Map>
		</div>	
	);	
};

export default Chart;