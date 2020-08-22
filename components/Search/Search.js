const Search = ({ searchChange, searchField, locations, getSearchedLocation }) => {
	//const filteredLocations = searchField ? getFilteredLocations() : '';

	return (
		<div>
			<input 
				list="filteredLocations"
				onChange={ searchChange }
				onInput={ getSearchedLocation } 
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
			</datalist>
		</div>
	);	
};

export default Search;