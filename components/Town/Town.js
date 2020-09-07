 const Town = ({ town, selectTownName }) => {
	return (
		<div
			className="db dib-ns tc br3 pa3 ma2 grow bw2 shadow-5 ttu pointer w5-l w4-m"  
			onClick={ selectTownName }
		>
			<h4>{ town.name }</h4>
		</div>
	);
};

export default Town;