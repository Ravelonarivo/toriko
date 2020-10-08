const Information = ({ location }) => {
	return (
		<div className="db dib-ns w-50-l w-100-m fl">
			<h4 className="f6 fw6 bg-white mt4 bb b--moon-gray">Informations</h4>
			<div>
				<p className="f6 lh-title mv2">
					<span className="dib mr3">Quartier : </span>
					<span className="dib">{location.district}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib mr3">Type : </span>
					<span className="dib">{location.type}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib mr3">Spécialité : </span>
					<span className="dib">{location.speciality}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib mr3">Adresse : </span>
					<span className="dib">{location.address}</span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib mr3">Phone : </span>
					<span className="dib">{location.phone} <span className="silver">(réserver place, commander, ... )</span></span>
				</p>
				<p className="f6 lh-title mv2">
					<span className="dib mr3">Livraison : </span>
					<span className="dib">{location.delivery ? 'oui' : 'non'}</span>
				</p>
			</div>
		</div>
	);
};

export default Information;