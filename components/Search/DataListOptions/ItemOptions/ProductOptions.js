import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../lib/fetcher';

const ProductOptions = ({ locationType, townName, getProducts }) => {
	useEffect(() => {
		if (data) getProducts(data);
	});

	/**
	* Get products by locationTypeId and TownName
	* - If locationType = 'afficher tout' locationType = undefined, so get all products
	* - The first value return by SWR is undefined, so need to check the variable data before using it
	*/
	const { data } = locationType
		? useSWR(`/api/product_locationType_town/${ locationType.id }/${ townName }`, fetcher)
		: useSWR(`/api/product_locationType_town/${ townName }`, fetcher); 

	return (
		<div>
			{
				data
					?	data.map((product, index) => (
							<option value={ product.name } key={ index }>{ product.type }</option>
						))
					: ''	
			}			
		</div>
	);
};

export default ProductOptions;