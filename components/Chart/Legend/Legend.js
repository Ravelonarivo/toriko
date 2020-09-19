import Control from 'react-leaflet-control';
import LocationTypeList from './LocationType/LocationTypeList';

const Legend = ({ locationTypes, getLegendItemColor }) => {
	return (
		<div>
			<Control position="topright">
				<LocationTypeList 
					locationTypes={ locationTypes } 
					getLegendItemColor={ getLegendItemColor }
				/>
			</Control>
		</div>
	);
};

export default Legend;