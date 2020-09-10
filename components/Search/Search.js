const Search = ({ inputRef, resetSavedSearch, savedSearchedDistrict, locations, searchChange, searchFieldValue, searchProduct, getProductsByLocationTypeIdAndTownName, getLocationsByProductNameAndTownName, searchProductType, getProductTypesByLocationTypeIdAndTownName, getLocationsByProductTypeNameAndTownName, searchDistrict, getDistrictsByLocationTypeIdAndTownName, getLocationsByDistrictIdAndLocationTypeId }) => {
	const products = searchFieldValue && searchProduct === false ? getProductsByLocationTypeIdAndTownName() : '';
	searchProduct ? getLocationsByProductNameAndTownName() : '';
	const productTypes = searchFieldValue && searchProductType === false ? getProductTypesByLocationTypeIdAndTownName() : ''; 
	searchProductType ? getLocationsByProductTypeNameAndTownName() : '';
	const districts = searchFieldValue && searchDistrict === false ? getDistrictsByLocationTypeIdAndTownName() : '';
	// if searchDistrict is true and there is no saved search in the localStorage
	searchDistrict && savedSearchedDistrict.length === 0 ? getLocationsByDistrictIdAndLocationTypeId() : '';

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
					searchFieldValue && products
						?	products.map((product, index) => (
								<option value={ product.name } key={ index }>{ product.type }</option>
							))
						: ''	 
				}
				{
					searchFieldValue && productTypes
						?	productTypes.map((productType, index) => (
								<option value={ productType.name } key={ index } />
							))
						: ''
				}
				{   
					searchFieldValue 
						?	locations.map((location, index) => (
								<option value={ location.name } key={ index }>{ location.type }</option>
							))
						: ''
				}
				{
					searchFieldValue && districts
						?	districts.map((district, index) => (
								<option value={ district.name } key={ index }>{ district.town }</option>
							))
						: ''
				}
			</datalist>
		</div>
	);	
};

export default Search;