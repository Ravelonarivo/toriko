import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const Chart = ({ locations, type }) => {
	const initLocation = {
		center: [14.71 , -17.46],
		zoom: 12.5 
	}

	return ( 
		<div>
			<h1>{ type }</h1>
			<Map center={ initLocation.center } zoom={ initLocation.zoom } style={{ height: '86vh', width: '100%' }}>
			    <TileLayer
			      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			    />
			    {
			    	locations.map((location, index) => (
			    		<Marker position={ [location.lat , location.long] } key={ index }>
			      			<Popup>{ location.name }</Popup>
			    		</Marker>
			    	))
			    }
  			</Map>
		</div>
	);
};

export default Chart;