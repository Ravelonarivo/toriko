import DataListOptions from './DataListOptions/DataListOptions';

const Search = ({ inputRef, resetSavedSearch, savedSearchedDistrict, locationType, townName, locations, searchChange, searchFieldValue, getProducts, getProductTypes, getDistricts }) => {
	const customizePlaceHolder = () => {
		let placeholder = '';
		if (locationType) {
			switch(locationType.name) {
				case 'restaurant': placeholder = 'Entrer plat, type plat, restaurant, zone'; break;
				case 'fast-food': placeholder = 'Entrer plat, type plat, fast-food, zone'; break;
				case 'traiteur': placeholder = 'Entrer plat, type plat, traiteur, zone'; break;
				case 'hotel': placeholder = 'Entrer type chambre, hotel, zone'; break;
			}
		} else {
			placeholder = 'Entrer plat, type plat, zone, restaurant, fast-food, ... ';
		}

		return placeholder;
	};

	return (
		<div>
			<input
				onFocus={ () => resetSavedSearch('focus') }
				ref={ inputRef }
				style={{ width:'450px' }}
				list="filteredLocations"
				onChange={ searchChange }
				type="text" 
				placeholder={ customizePlaceHolder() }
			/>
			<datalist id="filteredLocations">
				{
					<DataListOptions
						searchFieldValue={searchFieldValue}
						locations={locations}
						locationType={locationType}
						townName={townName}
						getProducts={getProducts}
						getProductTypes={getProductTypes}
						getDistricts={getDistricts}
					/>
				}
			</datalist>
		</div>
	);	
};

export default Search;