import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../lib/fetcher';

const ProductTypeOptions = ({ searchFieldValue, locationType, townName, getProductTypes }) => {
	useEffect(() => {
		if (data) getProductTypes(data);
	});	

	/**
	* Get productTypes by locationTypeId and TownName
	* - If locationType = 'afficher tout' locationType = undefined, so get all productTypes
	* - The first value return by SWR is undefined, so need to check the variable data before using it
	*/
	const { data } = locationType
		? useSWR(`/api/productType_locationType_town/${ locationType.id }/${ townName }`, fetcher)
		: useSWR(`/api/productType_locationType_town/${ townName }`, fetcher);
	
	return (
		<div>
			{
				data && searchFieldValue
					?	data.map((productType, index) => (
							<option value={ productType.name } key={ index } />
						))
					: ''
			}
		</div>
	);
};

export default ProductTypeOptions;