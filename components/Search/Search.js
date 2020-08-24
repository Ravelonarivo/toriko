const Search = ({ searchChange, searchField, locations, getLocationsByProductName, getLocationsByProductTypeName, getProductsByLocationTypeId, getProductTypesByLocationTypeId, searchProduct, searchProductType, getSearchedItem }) => {
	const products = searchField && searchProduct === false ? getProductsByLocationTypeId() : '';
	searchProduct === true ? getLocationsByProductName() : '';
	const productTypes = searchField && searchProductType === false ? getProductTypesByLocationTypeId() : ''; 
	searchProductType === true ? getLocationsByProductTypeName() : '';

	return (
		<div>
			<input 
				list="filteredLocations"
				onChange={ searchChange }
				onInput={ getSearchedItem } 
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
			</datalist>
		</div>
	);	
};

export default Search;