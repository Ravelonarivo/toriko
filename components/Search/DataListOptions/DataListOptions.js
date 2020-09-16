import ProductOptions from './ItemOptions/ProductOptions';
import ProductTypeOptions from './ItemOptions/ProductTypeOptions';
import LocationOptions from './ItemOptions/LocationOptions'; 
import DistrictOptions from './ItemOptions/DistrictOptions';

const DataListOptions = ({ locations, locationType, townName, getProducts, getProductTypes, getDistricts }) => {
	return (
		<div>
			<ProductOptions	
				locationType={locationType}
				townName={townName}
				getProducts={getProducts}
			/>
			<ProductTypeOptions	
				locationType={locationType}
				townName={townName}
				getProductTypes={getProductTypes}
			/>	
			<LocationOptions locations={ locations } />
			<DistrictOptions 
				locationType={locationType}
				townName={townName}
				getDistricts={getDistricts}
			/>
		</div>
	);
};

export default DataListOptions;