 const Town = ({ town }) => {
	return (
		<option value={ town.name }>
			{ town.name }
		</option>
	);	
};

export default Town;