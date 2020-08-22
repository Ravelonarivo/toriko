const Search = ({ searchChange, searchField, getFilteredLocations, getSearchedLocation }) => {
	const filteredLocations = searchField ? getFilteredLocations() : '';

	return (
		<div>
			<input 
				list="filteredLocations"
				onChange={ searchChange }
				onInput={ () => getSearchedLocation(event, filteredLocations) } 
				type="text" 
				placeholder="Tapez le nom de l'établissement ou du plat que vous cherchez"
			/>
			<datalist id="filteredLocations">
				{   
					searchField && filteredLocations
						?	filteredLocations.map((location, index) => (
								<option value={ location.name } key={ index } />
							))
						: ''
				}
			</datalist>
		</div>
	);	
};

export default Search;