import LocationType from './LocationType';

const LocationTypeList = ({ locationTypes, getLegendItemColor } ) => {
	return (
		<div className="legend">
			{
				locationTypes.map((locationType, index) => (
					<LocationType 
						key={ index } 
						locationType={ locationType }  
						getLegendItemColor={ getLegendItemColor }
					/>
				))
			}

			<style jsx>
				{`
					.legend {
						background: #fff;
						width: 100px;
						opacity: 0.8;
						border: solid 1px #999;
    					border-radius: 5px;
    					box-shadow: 0 0 4px -1px #333;
    					padding: 0 5px 0 5px;
					}
				`}
			</style>
		</div>
	);
};

export default LocationTypeList;