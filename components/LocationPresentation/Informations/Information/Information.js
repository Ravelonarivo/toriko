const Information = ({ location }) => {
	return (
		<div className="db dib-ns w-50-l w-100-m fl">
			<h4 className="f6 fw6 bg-white mt4 bb b--moon-gray">Informations</h4>
			<div>
				<p className="f6 lh-title mv2">
					<span className="dib">Quartier : </span>
					<span className="dib ml3">{location.district}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib">Type : </span>
					<span className="dib ml3">{location.type}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib">Spécialité : </span>
					<span className="dib ml3">{location.speciality}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib">Adresse : </span>
					<span className="dib ml3">{location.address}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib">Phone : </span>
					<span className="dib ml3">{location.phone} <span className="silver">(réserver place, commander, ... )</span></span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib">Livraison : </span>
					<span className="dib ml3">{location.delivery ? 'oui' : 'non'}</span>
				</p>
			</div>
		</div>
	);
};

export default Information;