import Control from 'react-leaflet-control';
import LocationTypeList from './LocationType/LocationTypeList';

const Legend = ({ locationTypeName, townName, getLegendItemColor }) => {
	return (
		<div>
			{
				locationTypeName === 'afficher-tout'
					?	<Control position="bottomright">
							<LocationTypeList 
								townName={ townName }
								getLegendItemColor={ getLegendItemColor }
							/>
						</Control>
					: 	''	
			}
		</div>
	);
};

export default Legend;