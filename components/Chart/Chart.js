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

	getLocationTypes = () => {
		let locationTypes = [];
		this.props.locations.forEach(item => {
			if(!locationTypes.includes(item.type)) locationTypes.push(item.type); 
		});
		return locationTypes;
	}

	getMarkerIcons = () => {
		let markerIcons = {}
		this.getLocationTypes().forEach(item => {
			markerIcons = { ...markerIcons, ...{ [item]: this.getMarkerIcon(item) } }
		});

		return markerIcons;
	}

	componentDidMount() {
		if (this.props.locationsType === 'afficher-tout') {
			this.setState({ markerIcons: this.getMarkerIcons() });
		} else {
			this.setState({ markerIcons: { [this.props.locationsType]: this.getMarkerIcon(this.props.locationsType) }});
		} 
		this.setState({ geolocIcon: this.getGeolocIcon() });
	}

	componentDidUpdate(prevProps) {
		if(prevProps.coords !== this.props.coords) {
			this.setState({ mapCenter: [this.props.coords.latitude, this.props.coords.longitude] });
			this.setState({ userLocation: [this.props.coords.latitude, this.props.coords.longitude] })
		}
	}

	getMapCurrentCenter = event => {
		const mapCenter = event.target.getCenter();
		this.setState({ mapCenter });
	}

	getMapCurrentZoom = event => {
		const mapZoom = event.target.getZoom();
		this.setState({ mapZoom });
	}

	getCurrentLocation = () => {
		this.setState({ mapCenter: this.state.userLocation }) 
		this.setState({ mapZoom: MAP.INIT_ZOOM })
	}

	render () {
		const { locations, locationsType, coords, isGeolocationEnabled, positionError } = this.props;
		const { userLocation, mapCenter, mapZoom, markerIcons, geolocIcon } = this.state;
		const { getMapCurrentCenter, getMapCurrentZoom, getCurrentLocation } = this;
		
		return ( 
			<div>
				<h1>{ locationsType }</h1>
				<Map  
					onMoveEnd={ coords ? getMapCurrentCenter.bind(this) : null } 
					onZoomEnd={ coords ? getMapCurrentZoom.bind(this) : null } 
					center={ mapCenter } zoom={ mapZoom } 
					style={{ height: '86vh', width: '100%' }}
				>
				    <TileLayer
				      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				    />
				    {
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Chart);