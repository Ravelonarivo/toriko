import DataListOptions from './DataListOptions/DataListOptions';

const Search = ({ inputRef, resetSavedSearch, savedSearchedDistrict, locationType, townName, locations, searchChange, searchFieldValue, getProducts, getProductTypes, getDistricts }) => {
	return (
		<div>
			<input
				onFocus={ resetSavedSearch }
				ref={ inputRef }
				style={{ width:'450px' }}
				list="filteredLocations"
				onChange={ searchChange }
				type="text" 
				placeholder="tapez par ex: beef burger/hamburger/yum-yum/plateau"
			/>
			<datalist id="filteredLocations">
				{
					searchFieldValue
						?	<DataListOptions 
								locations={ locations }
								locationType={ locationType }
								townName={ townName }
								getProducts={ getProducts }
								getProductTypes={ getProductTypes }
								getDistricts={ getDistricts }
							/>
						: 	''
				}
			</datalist>
		</div>
	);	
};

export default Search;