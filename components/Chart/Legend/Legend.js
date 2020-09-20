import Control from 'react-leaflet-control';
import LocationTypeList from './LocationType/LocationTypeList';

const Legend = ({ locationTypeName, locationTypes, getLegendItemColor }) => {
	return (
		<div>
			{
				locationTypeName === 'afficher-tout'
					?	<Control position="bottomright">
							<LocationTypeList 
								locationTypes={ locationTypes } 
								getLegendItemColor={ getLegendItemColor }
							/>
						</Control>
					: 	''	
			}
		</div>
	);
};

export default Legend;