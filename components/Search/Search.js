const Search = ({ locations, searchChange, searchField, searchProduct, getProductsByLocationTypeIdAndTownName, getLocationsByProductNameAndTownName, searchProductType, getProductTypesByLocationTypeIdAndTownName, getLocationsByProductTypeNameAndTownName, searchDistrict, getDistrictsByLocationTypeIdAndTownName, getLocationsByDistrictIdAndLocationTypeId }) => {
	const products = searchField && searchProduct === false ? getProductsByLocationTypeIdAndTownName() : '';
	searchProduct ? getLocationsByProductNameAndTownName() : '';
	const productTypes = searchField && searchProductType === false ? getProductTypesByLocationTypeIdAndTownName() : ''; 
	searchProductType ? getLocationsByProductTypeNameAndTownName() : '';
	const districts = searchField && searchDistrict === false ? getDistrictsByLocationTypeIdAndTownName() : '';
	searchDistrict ? getLocationsByDistrictIdAndLocationTypeId() : '';

	return (
		<div>
			<input 
				style={{ width:'450px' }}
				list="filteredLocations"
				onChange={ searchChange }
				type="text" 
				placeholder="tapez par ex: beef burger/hamburger/yum-yum/plateau"
			/>
			<datalist id="filteredLocations">
				{
					searchField && products
						?	products.map((product, index) => (
								<option value={ product.name } key={ index }>{ product.type }</option>
							))
						: ''	 
				}
				{
					searchField && productTypes
						?	productTypes.map((productType, index) => (
								<option value={ productType.name } key={ index } />
							))
						: ''
				}
				{   
					searchField 
						?	locations.map((location, index) => (
								<option value={ location.name } key={ index }>{ location.type }</option>
							))
						: ''
				}
				{
					searchField && districts
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