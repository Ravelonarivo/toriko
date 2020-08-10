import { Map, Popup, TileLayer } from 'react-leaflet-universal';
import { Marker } from 'react-leaflet';
import Link from 'next/link';
import { geolocated } from "react-geolocated";

const Chart = (props) => {
	const initLocation = {
		center: [14.71 , -17.46],
		zoom: 12.5 
	}

	const { locations, type, coords, isGeolocationEnabled, positionError} = props
	if (type !== 'afficher-tout') console.log(getIcon(type)); 
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
			    		if (type === 'afficher-tout') console.log(getIcon(location.type));
			    		return (
				    		<Marker position={ [location.lat , location.long] } key={ index }>
				      			<Popup>
				      				<Link href="/location/[locationId]" as={`/location/${location.id}`}><a>{ location.name }</a></Link>
				      			</Popup>
				    		</Marker>
			    		) 
			    	})
			    }
			    { coords ? <Marker position={ [coords.latitude , coords.longitude] }/> : '' }
  			</Map>
		</div>
	);
};

const getIcon = type => {
	let iconUrl = '';
	switch(type) {
		case 'restaurant' : iconUrl='restaurant'; break;
		case 'fast-food' : iconUrl='fast-food'; break;
		case 'traiteur' : iconUrl='traiteur'; break;
		case 'hotel' : iconUrl='hotel'; break;
	}
	return iconUrl;
};

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Chart);