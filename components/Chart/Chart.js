import { Map, Popup, TileLayer } from 'react-leaflet-universal';
import { Marker } from 'react-leaflet';
import Link from 'next/link';
import { geolocated } from "react-geolocated";
import { icon } from 'leaflet';
import { Component } from 'react';
import Control from 'react-leaflet-control';

import { MAP } from '../../lib/constants';

class Chart extends Component {
	constructor() {
		super();
		this.state = {
			userLocation: MAP.INIT_CENTER,
			mapCenter: MAP.INIT_CENTER,
			mapZoom: MAP.INIT_ZOOM,
			geolocIcon: '',
			markerIcons: { },
		};
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
		this.props.types.forEach(item => {
			markerIcons = { ...markerIcons, ...{ [item.name]: this.getMarkerIcon(item.name) } }
		});

		return markerIcons;
	}

	componentDidMount() {
		if (this.props.locationsType === 'afficher-tout') {
			// Get all markers icon
			this.setState({ markerIcons: this.getMarkerIcons() });
		} else {
			// Get the corresponding icon e.g hotel icon 
			this.setState({ markerIcons: { [this.props.locationsType]: this.getMarkerIcon(this.props.locationsType) }});
		} 
		this.setState({ geolocIcon: this.getGeolocIcon() });
	}

	componentDidUpdate(prevProps) {
		/**
		  * Recenter the map on the user location 
		  * If geolocation is enable coords turn from null to client geolocation
		  */
		if(prevProps.coords !== this.props.coords) {
			this.setState({ mapCenter: [this.props.coords.latitude, this.props.coords.longitude] });
			this.setState({ userLocation: [this.props.coords.latitude, this.props.coords.longitude] })
		}
	
		if (prevProps.searchLocation !== this.props.searchLocation) {
			this.setState({ mapCenter: [this.props.locations[0].lat, this.props.locations[0].long] });
			/**
			* To avoid infinite loop prevProps.search must be different to this.props.search 
			* that's why search state must be set to false after the mapCenter updated with the 
			* lat and long of the searched location 
			*/
			this.props.setSearchLocationToFalse();
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

	render () {
		const { locations, locationsType, coords, isGeolocationEnabled, positionError } = this.props;
		const { userLocation, mapCenter, mapZoom, markerIcons, geolocIcon } = this.state;
		const { updateCurrentCenter, updateCurrentZoom, getCurrentLocation } = this;

		return ( 
			<div>
				<Map  
					onMoveEnd={ coords ? updateCurrentCenter : null } 
					onZoomEnd={ coords ? updateCurrentZoom : null } 
					center={ mapCenter } zoom={ mapZoom } 
					style={{ height: '86vh', width: '100%' }}
				>
				    <TileLayer
				      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				    />
				    {   
				    	// Popup autoPan = false to avoid the loop when a marker move out of the viewport
				    	locations.map((location, index) => {
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
				    	})
				    }
				    { 
				    	coords 
				    		? 	<div>
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
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Chart);