import { Map, Popup, TileLayer } from 'react-leaflet-universal';
import { Marker, LayersControl, LayerGroup } from 'react-leaflet';
import Link from 'next/link';
import { geolocated } from "react-geolocated";
import { icon } from 'leaflet';
import { Component, createRef } from 'react';
import Control from 'react-leaflet-control';
import { getDistance, convertDistance } from 'geolib';

import { MAP } from '../../lib/constants';

class Chart extends Component {
	constructor() {
		super();
		this.state = {
			userLocation: [],
			mapCenter: [],
			mapZoom: MAP.INIT_ZOOM,
			geolocIcon: '',
			markerIcons: { }
		};
		this.layerControlRef = createRef();
	}

	getMarkerIcon = type => {
		switch(type) {
			case 'restaurant' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.restoIcon; break;
			case 'fast-food' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.fastfoodIcon; break;
			case 'traiteur' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.traiteurIcon; break;
			case 'hotel' : MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.hotelIcon; break;
		}

		return icon(MAP.ICON_PROPERTIES);
	} 

	getGeolocIcon = () => {
		MAP.ICON_PROPERTIES.iconUrl = MAP.LOCATIONS_ICON.geolocIcon;
		return icon(MAP.ICON_PROPERTIES);
	}

	getMarkerIcons = () => {
		let markerIcons = {}
		this.props.locationTypes.forEach(item => {
			markerIcons = { ...markerIcons, ...{ [item.name]: this.getMarkerIcon(item.name) } }
		});

		return markerIcons;
	}

	componentDidMount() {
		const [town] = this.props.town;

		// If the saved search is a location test if searchLocation is true 
		if (this.props.searchLocation) {
			const [savedLocation] = this.props.locations;
			this.setState({ mapCenter: [savedLocation.lat, savedLocation.long] });
			this.props.setSearchLocationToFalse();
		// If the saved search is a district test if searchDistrict is true 
		} if (this.props.searchDistrict) {
			const [savedSearchedDistrict] = this.props.searchedDistrict;
			this.setState({ mapCenter: [savedSearchedDistrict.lat, savedSearchedDistrict.long] });
			this.props.setSearchDistrictToFalse();
		// If there is no saved search or the saved search is not a location or a district 
		} else {	
			this.setState({ mapCenter: [town.latitude, town.longitude] })
		}
		
		this.setState({ userLocation: [town.latitude, town.longitude] })

		if (this.props.locationTypeName === 'afficher-tout') {
			// Get all markers icon
			this.setState({ markerIcons: this.getMarkerIcons() });
		} else {
			// Get the corresponding icon e.g hotel icon 
			this.setState({ markerIcons: { [this.props.locationTypeName]: this.getMarkerIcon(this.props.locationTypeName) }});
		} 
		this.setState({ geolocIcon: this.getGeolocIcon() });
	}

	componentDidUpdate(prevProps) {
		if(prevProps.coords !== this.props.coords) {
			this.setState({ userLocation: [this.props.coords.latitude, this.props.coords.longitude] })
		}
	
		// Recenter the map on the searched location
		if (prevProps.searchLocation !== this.props.searchLocation) {
			const [location] = this.props.locations;
			this.setState({ mapCenter: [location.lat, location.long] });
			/**
			* To avoid infinite loop, prevProps.search must be different to this.props.search 
			* that's why search state must be set to false after the mapCenter updated with the 
			* lat and long of the searched location 
			*/
			this.props.setSearchLocationToFalse();
		}

		// Recenter the map on the searched district
		if (prevProps.searchDistrict !== this.props.searchDistrict) {
			/**
			* To avoid the bug: unmatched locations still display when the map is recentered on the searched district geolocation	
			* wait 100ms to let getLocationsByDistrictIdAndLocationTypeId get the locations before recenter the map
			*/
			setTimeout(() => {
				const [searchedDistrict] = this.props.searchedDistrict;
				this.setState({ mapCenter: [searchedDistrict.lat, searchedDistrict.long] })
				this.props.setSearchDistrictToFalse();
			}, 1000)
		}

		// If there is specialitesFilterState saved in the locolStorage, not collapse the LayersControl 
		if (this.layerControlRef.current && localStorage.getItem('specialitiesFilterState')) {
			this.layerControlRef.current.leafletElement.expand();
		}
	}

	/**
	* mapCenter and mapZoom state must be updated with the current center and  the current zoom while the user drag or zoom 
	* the map. These states are updated with userLocation and initZoom when the user clicks on "afficher votre localisation"
	*/

	/**
	* Run when the user drags the map
	* Link to Map component onMoveEnd event  
	*/ 
	updateCurrentCenter = event => {
		const mapCenter = event.target.getCenter();
		this.setState({ mapCenter });
	}

	/**
	* Run when the user zooms the map  
	* Link to Map component onZoomEnd  event
	*/
	updateCurrentZoom = event => {
		const mapZoom = event.target.getZoom();
		this.setState({ mapZoom });
	}

	/**
	* Run when the user clicks on "afficher votre localisation"
	*/
	getCurrentLocation = () => {
		this.setState({ mapCenter: this.state.userLocation }) 
		this.setState({ mapZoom: MAP.INIT_ZOOM })
	}

	getDistanceBetweenLocationAndUserLocation = (location, userLocation) => {
		const distance = getDistance({latitude: location.lat, longitude: location.long}, {latitude: userLocation[0], longitude: userLocation[1]});
		return distance >= 1000 
			? '(' + convertDistance(distance, 'km').toFixed(1) + 'km)'
			: '(' + distance + 'm)'
	}

	saveSpecialitiesFilterState = () => { 
		if (this.layerControlRef.current) {
			const specialitiesChecking =  this.layerControlRef.current.leafletElement._layerControlInputs.map(layerControlInput => layerControlInput.checked);	
			const specialitiesName =  this.layerControlRef.current.leafletElement._layers.map(layer => layer.name);
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
	checkedLayersControlOverlay = specialityName => {
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

	render () {
		const { town, locations, locationTypeName, coords, isGeolocationEnabled, positionError, specialities } = this.props;
		const { userLocation, mapCenter, mapZoom, markerIcons, geolocIcon } = this.state;
		const { updateCurrentCenter, updateCurrentZoom, getCurrentLocation, getDistanceBetweenLocationAndUserLocation, saveSpecialitiesFilterState, checkedLayersControlOverlay } = this;
		
		return ( 
			<div>
				<Map 
					onMoveEnd={ updateCurrentCenter } 
					onZoomEnd={ updateCurrentZoom } 
					center={ mapCenter } zoom={ mapZoom } 
					style={{ height: '83vh', width: '100%' }}
				> 
					<LayersControl position="bottomleft" ref={ this.layerControlRef }>
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
					    				{
					    					locations.map((location, index) => 
					    						location.speciality_id === speciality.id
					    							? 	<Marker 
							    							icon={ markerIcons[location.type] } 
							    							position={ [location.lat , location.long] }
							    							key={ index } 
							    						>
							      							<Popup autoPan={false}>
							      								<Link href="/location/[locationId]" as={`/location/${location.id}`}>
							      									<a>
							      										{ location.name }&nbsp;
							      										{ 
							      											coords
							      												? 	getDistanceBetweenLocationAndUserLocation(location, userLocation)
							      												: 	'' 
							      										}
							      									</a>
							      								</Link>
							      							</Popup>
							    						</Marker>
							    					: ''
					    					)
					    				}
					    			</LayerGroup>
					    		</LayersControl.Overlay>
					    	))
					    }
					</LayersControl> 
					{/*<TileLayer
					    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>*/}
					{
						// Popup autoPan = false to avoid the loop when a marker move out of the viewport
					   /* locations.map((location, index) => {
					    	return (
					    		<Marker 
							    	icon={ markerIcons[location.type] } 
							    	position={ [location.lat , location.long] } 
							    	key={ index }
							    >
							     	<Popup autoPan={false}>
							      		<Link href="/location/[locationId]" as={`/location/${location.id}`}>
							      			<a>{ location.name }</a>
							      		</Link>
							      	</Popup>
							    </Marker>
							    	
					    	) 
					    })*/
					}   
				    { 
				    	coords 
				    		?	<div>
				    				<Marker icon={ geolocIcon } position={ userLocation }/>
				    				<Control position="topleft"> 									
	  									<img className="showlocation" src="/chart/showlocation.png" onClick={ getCurrentLocation } title="Afficher votre localisation"/>	  									
	  								</Control>
	  							</div>
				    		: '' 
				    }
	  			</Map>
	  			<style jsx>
	  				{`
	  					.showlocation {
	  						width: 26px;
	  						background: #fff;
	  						border: solid 1px #999;
    						border-radius: 5px;
    						box-shadow: 0 0 4px -1px #333;
    						padding: 5px;
	  					}

	  					.showlocation:hover {
	  						background: #f4f4f4;
	  						cursor: pointer;
	  					}
	  				`}
	  			</style>
			</div>
		);
	}
};

// Use by react-geolocated package
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    watchPosition: true
})(Chart);