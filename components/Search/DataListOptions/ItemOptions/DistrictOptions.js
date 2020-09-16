import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../lib/fetcher';

const DistrictOptions = ({ locationType, townName, getDistricts }) => {
	
	useEffect(() => {
		if (data) getDistricts(data);
	});

	/**
	* Get districts by locationTypeId and TownName
	* - If locationType = 'afficher tout' locationType = undefined, so get all districts
	* - The first value return by SWR is undefined, so need to check the variable data before using it
	*/
	const { data } = locationType
		? useSWR(`/api/district_locationType_town/${ locationType.id }/${ townName }`, fetcher)
		: useSWR(`/api/district_locationType_town/${ townName }`, fetcher);

	return (
		<div>
			{
				data
					?	data.map((district, index) => (
							<option value={ district.name } key={ index }>{ district.town }</option>
						))
					: ''
			}
		</div>
	);
};

export default DistrictOptions;