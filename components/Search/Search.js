const Search = ({ searchChange, searchField, filteredLocations, getSearchedLocation }) => {
	return (
		<div>
			<input 
				list="filterdLocations"
				onChange={ searchChange }
				onInput={ getSearchedLocation } 
				type="text" 
				placeholder="Tapez le nom de l'établissement ou du plat que vous cherchez"
			/>
			<datalist id="filterdLocations">
				{   
					searchField 
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