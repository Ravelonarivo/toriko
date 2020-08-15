import { Component } from 'react';

const Search = ({ searchChange, filteredLocations, searchField }) => {
	return (
		<div>
			<input 
				list="filterdLocations"
				onChange={ searchChange } 
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