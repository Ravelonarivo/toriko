import DataListOptions from './DataListOptions/DataListOptions';

const Search = ({ inputRef, resetSavedSearch, savedSearchedDistrict, locationType, townName, locations, searchChange, searchFieldValue, getProducts, getProductTypes, getDistricts }) => {
	const customizePlaceHolder = () => {
		let placeholder = '';
		if (locationType) {
			switch(locationType.name) {
				case 'restaurant': placeholder = 'Chercher plat, type plat, restaurant, zone'; break;
				case 'fast-food': placeholder = 'Chercher plat, type plat, fast-food, zone'; break;
				case 'traiteur': placeholder = 'Chercher plat, type plat, traiteur, zone'; break;
				case 'hotel': placeholder = 'Chercher chambre, type chambre, hotel, zone'; break;
			}
		} else {
			placeholder = 'Chercher plat, type plat, zone, restaurant, fast-food, ... ';
		}

		return placeholder;
	};

	return (
		<div>
			<input
				onFocus={ () => resetSavedSearch('cleanSearchField') }
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