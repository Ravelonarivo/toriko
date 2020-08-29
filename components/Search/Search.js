const Search = ({ locations, searchChange, searchField, searchProduct, getProductsByLocationTypeId, getLocationsByProductName, searchProductType, getProductTypesByLocationTypeId, getLocationsByProductTypeName, searchDistrict, getDistrictsByLocationTypeId, getLocationsByDistrictIdAndLocationTypeId }) => {
	const products = searchField && searchProduct === false ? getProductsByLocationTypeId() : '';
	searchProduct ? getLocationsByProductName() : '';
	const productTypes = searchField && searchProductType === false ? getProductTypesByLocationTypeId() : ''; 
	searchProductType ? getLocationsByProductTypeName() : '';
	const districts = searchField && searchDistrict === false ? getDistrictsByLocationTypeId() : '';
	searchDistrict ? getLocationsByDistrictIdAndLocationTypeId() : '';

	return (
		<div>
			<input 
				list="filteredLocations"
				onChange={ searchChange }
				type="text" 
				placeholder="Tapez le nom de l'établissement ou du plat que vous cherchez"
			/>
			<datalist id="filteredLocations">
				{   
					searchField 
						?	locations.map((location, index) => (
								<option value={ location.name } key={ index } />
							))
						: ''
				}
				{
					searchField && products
						?	products.map((product, index) => (
								<option value={ product.name } key={ index } />
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
					searchField && districts
						?	districts.map((district, index) => (
								<option value={ district.name } key={ index } />
							))
						: ''
				}
			</datalist>
		</div>
	);	
};

export default Search;