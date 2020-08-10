import { Map, Popup, TileLayer } from 'react-leaflet-universal';
import { Marker } from 'react-leaflet';
import Link from 'next/link';
import { geolocated } from "react-geolocated";
import { icon } from 'leaflet';

import { 
	LOCATIONS_ICON,
	ICON_PROPERTIES
} from '../../lib/constants';

const Chart = (props) => {
	const initLocation = {
		center: [14.71 , -17.46],
		zoom: 12.5 
	}

	const { locations, type, coords, isGeolocationEnabled, positionError} = props

	let markerIcon = '';
	if (type !== 'afficher-tout') markerIcon = getMarkerIcon(type);

	return ( 
		<div>
			<h1>{ type }</h1>
			<Map center={ coords ? [coords.latitude, coords.longitude] : initLocation.center } zoom={ initLocation.zoom } style={{ height: '86vh', width: '100%' }}>
			    <TileLayer
			      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			    />
			    {
			    	locations.map((location, index) => {
			    		if (type === 'afficher-tout') markerIcon = getMarkerIcon(location.type);
			    		return (
				    		<Marker icon={ markerIcon } position={ [location.lat , location.long] } key={ index }>
				      			<Popup>
				      				<Link href="/location/[locationId]" as={`/location/${location.id}`}><a>{ location.name }</a></Link>
				      			</Popup>
				    		</Marker>
			    		) 
			    	})
			    }
			    { coords ? <Marker icon={ getGeolocIcon() }position={ [coords.latitude , coords.longitude] }/> : '' }
  			</Map>
		</div>
	);
};

const getMarkerIcon = type => {
	switch(type) {
		case 'restaurant' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.restoIcon; break;
		case 'fast-food' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.fastfoodIcon; break;
		case 'traiteur' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.traiteurIcon; break;
		case 'hotel' : ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.hotelIcon; break;
	}

	return icon(ICON_PROPERTIES);
};

const getGeolocIcon = () => {
	ICON_PROPERTIES.iconUrl = LOCATIONS_ICON.geolocIcon;
	return icon(ICON_PROPERTIES);
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Chart);