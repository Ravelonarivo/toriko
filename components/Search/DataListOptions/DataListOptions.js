import ProductOptions from './ItemOptions/ProductOptions';
import ProductTypeOptions from './ItemOptions/ProductTypeOptions';
import LocationOptions from './ItemOptions/LocationOptions'; 
import DistrictOptions from './ItemOptions/DistrictOptions';

const DataListOptions = ({ searchFieldValue, locations, locationType, townName, getProducts, getProductTypes, getDistricts }) => {
	return (
		<div>
			<ProductOptions	
				searchFieldValue={ searchFieldValue }
				locationType={locationType}
				townName={townName}
				getProducts={getProducts}
			/>
			<ProductTypeOptions
				searchFieldValue={ searchFieldValue }	
				locationType={locationType}
				townName={townName}
				getProductTypes={getProductTypes}
			/>	
			<LocationOptions
				searchFieldValue={ searchFieldValue } 
				locations={ locations } 
			/>
			<DistrictOptions 
				searchFieldValue={ searchFieldValue }
				locationType={locationType}
				townName={townName}
				getDistricts={getDistricts}
			/>
		</div>
	);
};

export default DataListOptions;