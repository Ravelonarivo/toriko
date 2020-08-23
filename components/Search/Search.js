const Search = ({ searchChange, searchField, locations, getProductsByLocationsType, getLocationsByProductName, searchProduct, getSearchedItem }) => {
	const products = searchField && searchProduct === false ? getProductsByLocationsType() : '';
	searchProduct === true ? getLocationsByProductName() : '';

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
			</datalist>
		</div>
	);	
};

export default Search;