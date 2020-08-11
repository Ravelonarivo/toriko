import { Map, Popup, TileLayer } from 'react-leaflet-universal';
import { Marker } from 'react-leaflet';
import Link from 'next/link';
import { geolocated } from "react-geolocated";
import { icon } from 'leaflet';
import { Component } from 'react';
import { getTypes } from '../../lib/type';

import { 
	LOCATIONS_ICON,
	ICON_PROPERTIES
} from '../../lib/constants';

class Chart extends Component {
	constructor() {
		super();
		this.state = {
			mapCenter: [14.71 , -17.46],
			mapZoom: 12.5 ,
			geolocIcon: '',
			markerIcons: { }
		};
	}

	getMarkerIcon = type => {
		switch(type) {
			case 'restaurant' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.restoIcon; break;
			case 'fast-food' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.fastfoodIcon; break;
			case 'traiteur' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.traiteurIcon; break;
			case 'hotel' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.hotelIcon; break;
		}

		return icon(ICON_PROPERTIES);
	} 

	getGeolocIcon = () => {
		ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.geolocIcon;
		return icon(ICON_PROPERTIES);
	}

	getLocationsType = () => {
		let locationsType = [];
		this.props.locations.forEach(item => {
			if(!locationsType.includes(item.type)) locationsType.push(item.type); 
		});
		return locationsType;
	}

	getMarkerIcons = () => {
		let markerIcons = {}
		this.getLocationsType().forEach(item => {
			markerIcons = { ...markerIcons, ...{ [item]: this.getMarkerIcon(item) } }
		});

		return markerIcons;
	};

	componentDidMount() {
		if (this.props.type === 'afficher-tout') {
			this.setState({ markerIcons: this.getMarkerIcons() });
		} else {
			this.setState({ markerIcons: { [this.props.type]: this.getMarkerIcon(this.props.type) }});
		} 

		this.setState({ geolocIcon: this.getGeolocIcon() });
	}

	componentDidUpdate(prevProps) {
		if(prevProps.coords !== this.props.coords) {
			this.setState({ mapCenter: [this.props.coords.latitude, this.props.coords.longitude] });
		}
	}

	render () {
		const { locations, type, coords, isGeolocationEnabled, positionError } = this.props;
		const { mapCenter, mapZoom, markerIcons, geolocIcon } = this.state;
		return ( 
			<div>
				<h1>{ type }</h1>
				<Map center={ mapCenter } zoom={ mapZoom } style={{ height: '86vh', width: '100%' }}>
				    <TileLayer
				      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				    />
				    {
				    	locations.map((location, index) => {
				    		return (
					    		<Marker icon={ markerIcons[location.type] } position={ [location.lat , location.long] } key={ index }>
					      			<Popup>
					      				<Link href="/location/[locationId]" as={`/location/${location.id}`}><a>{ location.name }</a></Link>
					      			</Popup>
					    		</Marker>
				    		) 
				    	})
				    }
				    { coords ? <Marker icon={ geolocIcon } position={ mapCenter }/> : '' }
	  			</Map>
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