const LocationType = ({ locationType, getLegendItemColor }) => {
	return (
		<div>
			<i className="legend-icon" style={{ background: `${ getLegendItemColor(locationType.name) }` }}></i>
			<p>{ locationType.name }</p>
			<style jsx>
				{`
					.legend-icon {
					    border-radius: 5px;
					    width: 18px;
					    height: 18px;
					    float: left;
					    margin-right: 5px;
					}
				`}
			</style>
		</div>
	);
};

export default LocationType;