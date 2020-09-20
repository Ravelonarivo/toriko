import { Map } from 'react-leaflet-universal';
import { usePosition } from 'use-position';
import { icon } from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import { getDistance, convertDistance } from 'geolib';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';

import { MAP } from '../../lib/constants';

import ChartLayersControl from './ChartLayersControl/ChartLayersControl';
import UserLocationMarker from './Markers/UserLocationMarker';
import Legend from './Legend/Legend';

const Chart = ({ townProp, townName, searchFieldValue, locationTypes, locationTypeName, locations, locationType, getSearchedLocations, locationSearch, searchedLocationProp, districtSearch, searchedDistrictProp, productSearch, searchedProduct, productTypeSearch, searchedProductType, saveSearch }) => {
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
	}; 

	const getGeolocIcon = () => {
		MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.geolocIcon;
		return icon(MAP.ICON_PROPERTIES);
	};

	const getMarkerIcons = () => {
		let markerIcons = {}
		locationTypes.forEach(item => {
			markerIcons = { ...markerIcons, ...{ [item.name]: getMarkerIcon(item.name) } }
		});

		return markerIcons;
	};

	const watch = true;
	const {
		latitude,
		longitude,
		timestamp,
		accuracy,
		error,
	} = usePosition(watch, { enableHighAccuracy: true }); 

	useEffect(() => {
		const [town] = townProp;
		
		// Test if there is a saved location search. If there is, locationSearch is true 
		if (locationSearch) {
			const [savedLocation] = searchedLocationProp;
			setMapCenter([savedLocation.lat, savedLocation.long]);
		// Test if there is a saved district search. If there is, districtSearch is true 
		} else if (districtSearch) {
			const [savedSearchedDistrict] = searchedDistrictProp;
			setMapCenter([savedSearchedDistrict.lat, savedSearchedDistrict.long]);
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
	}, [latitude, longitude]);

	useEffect(() => {
		// If there is a location search, recenter the map at the searched location
		if (locationSearch && searchedLocationProp.length) {
			const [searchedLocation] = searchedLocationProp;
			setMapCenter([searchedLocation.lat, searchedLocation.long]);
			setMapZoom(MAP.INIT_ZOOM);
		}
	}, [locationSearch, searchedLocationProp]);

	useEffect(() => {
		// If there is a district search, recenter the map at the searched district
		if (districtSearch && searchedDistrictProp.length) {
			const [searchedDistrict] = searchedDistrictProp;
			setMapCenter([searchedDistrict.lat, searchedDistrict.long]);
			setMapZoom(MAP.INIT_ZOOM);
		}
	}, [districtSearch, searchedDistrictProp]);

	useEffect(() => {
		// If there is a product search, recenter the map at the town 
		const [town] = townProp;
		if (productSearch && searchedProduct) {
			setMapCenter([town.latitude, town.longitude]);
			setMapZoom(MAP.INIT_ZOOM);
		}
	}, [productSearch, searchedProduct]);

	useEffect(() => {
		// If there is a productType search, recenter the map at the town 
		const [town] = townProp;
		if (productTypeSearch && searchedProductType) {
			setMapCenter([town.latitude, town.longitude]);
			setMapZoom(MAP.INIT_ZOOM);
		}
	}, [productTypeSearch, searchedProductType]);

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
	};

	/**
	* Run when the user clicks on "afficher votre localisation"
	*/
	const getCurrentLocation = () => {
		setMapCenter(userLocation); 
		setMapZoom(MAP.INIT_ZOOM);
	};

	const getDistanceBetweenLocationAndUserLocation = (location, userLocation) => {
		const [latitude, longitude] = userLocation;
		const distance = getDistance({latitude: location.lat, longitude: location.long}, { latitude, longitude });
		return distance >= 1000 
			? '(' + convertDistance(distance, 'km').toFixed(1) + 'km)'
			: '(' + distance + 'm)'
	};

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
	};

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
	};

	const getLegendItemColor = locationTypeName => {
		return locationTypeName === 'restaurant'
			? MAP.LEGEND_ICON_COLOR[locationTypeName]
			: locationTypeName === 'fast-food'
			? MAP.LEGEND_ICON_COLOR[locationTypeName]
			: locationTypeName === 'traiteur'
			? MAP.LEGEND_ICON_COLOR[locationTypeName]
			: MAP.LEGEND_ICON_COLOR[locationTypeName];
	};
	
	return ( 
		<div>
			<Map 
				onMoveEnd={ updateCurrentCenter } 
				onZoomEnd={ updateCurrentZoom } 
				center={ mapCenter } zoom={ mapZoom } 
				style={{ height: '83vh', width: '100%' }}
			> 
				<ChartLayersControl
					layerControlRef={ layerControlRef } 
					specialities={ specialities } 

					checkedLayersControlOverlay={ checkedLayersControlOverlay }
					saveSpecialitiesFilterState={ saveSpecialitiesFilterState } 
					
					searchFieldValue={ searchFieldValue }
					townName={ townName } 
					
					productSearch={ productSearch } 
					searchedProduct={ searchedProduct }
					
					productTypeSearch={ productTypeSearch} 
					searchedProductType={ searchedProductType }
					
					districtSearch={ districtSearch }
					searchedDistrict={ searchedDistrictProp }
					
					locationSearch={ locationSearch }
					searchedLocation={ searchedLocationProp }
					
					locations={ locations }
					locationType={ locationType }
					getSearchedLocations={ getSearchedLocations }
					markerIcons={ markerIcons }
					
					isGeolocationEnable={ isGeolocationEnable }
					getDistanceBetweenLocationAndUserLocation={ getDistanceBetweenLocationAndUserLocation }
					
					userLocation={ userLocation }
					saveSearch={ saveSearch }
				/>

				<UserLocationMarker
					isGeolocationEnable={ isGeolocationEnable }
					geolocIcon={ geolocIcon }
					userLocation={ userLocation }
					getCurrentLocation={ getCurrentLocation }
				/>

				<Legend
					locationTypeName={ locationTypeName } 
					townName={ townName }
					getLegendItemColor={ getLegendItemColor }
				/>
	  		</Map>
		</div>	
	);	
};

export default Chart;