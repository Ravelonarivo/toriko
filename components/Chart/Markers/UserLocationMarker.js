import { Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';

const UserLocationMarker = ({ isGeolocationEnable, geolocIcon, userLocation, getCurrentLocation  }) => {
	return (
		<div>
			{
				isGeolocationEnable 
					? 	<div>
							<Marker icon={ geolocIcon } position={ userLocation } />
							<Control position="topleft">
								<img className="showlocation" src="/chart/showlocation.png" onClick={ getCurrentLocation } title="Afficher votre localisation" />
							</Control>
						</div>
					: 	''
			}

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
};

export default UserLocationMarker;