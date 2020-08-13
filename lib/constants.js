import restoIcon from '../public/chart/resto_icon.png';
import fastfoodIcon from '../public/chart/fastfood_icon.png';
import traiteurIcon from '../public/chart/traiteur_icon.png';
import hotelIcon from '../public/chart/hotel_icon.png';
import geolocIcon from '../public/chart/geoloc_icon.gif';

export const MAP =  {
	LOCATIONS_ICON: {
		fastfoodIcon,
		restoIcon,
		hotelIcon,
		traiteurIcon,
		geolocIcon
	},

	ICON_PROPERTIES: {
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [30, 41],
		iconAnchor: [12, 41],
		popupAnchor: [4, -30],
		shadowSize: [41, 41],
		shadowAnchor: [10, 44]
	},

	INIT_CENTER: [14.71 , -17.46],
	INIT_ZOOM: 12.5,
}

