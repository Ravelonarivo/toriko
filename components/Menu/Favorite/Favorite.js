const Favorite = ({ location }) => {
	return (
		<div className="db-ns dn-m dn bg-white w-30-l br3 shadow-5">
			<h3 className="tc">Liste des favoris</h3>
			<div className="bt b--light-silver tc pa3">
				<p>Vous n'avez pas de favoris chez { location.name }</p>
			</div>
		</div>
	);
};

export default Favorite;