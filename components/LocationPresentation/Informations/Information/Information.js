const Information = ({ location }) => {
	return (
		<div className="db dib-ns w-50-l w-100-m fl">
			<div className="flex justify-center">
				<h4 className="f6 fw6 tc ba b--light-silver w-50 br4 bg-white pv1" style={{ transform: 'translateY(37px)' }}>Informations</h4>
			</div>
			<div className="bt b--light-silver mr3 pv4 ph4">
				<dl className="f6 lh-title mv2">
					<dt className="dib">Quartier : </dt>
					<dd className="dib ml3">{location.district}</dd>
				</dl>
				<dl className="f6 lh-title mv2">
					<dt className="dib">Type : </dt>
					<dd className="dib ml3">{location.type}</dd>
				</dl>
				<dl className="f6 lh-title mv2">
					<dt className="dib">Spécialité : </dt>
					<dd className="dib ml3">{location.speciality}</dd>
				</dl>
				<dl className="f6 lh-title mv2">
					<dt className="dib">Adresse : </dt>
					<dd className="dib ml3">{location.address}</dd>
				</dl>
				<dl className="f6 lh-title mv2">
					<dt className="dib">Phone : </dt>
					<dd className="dib ml3">{location.phone} <span className="silver">(réserver place, commander, ... )</span></dd>
				</dl>
				<dl className="f6 lh-title mv2">
					<dt className="dib">Livraison : </dt>
					<dd className="dib ml3">{location.delivery ? 'oui' : 'non'}</dd>
				</dl>
			</div>
		</div>
	);
};

export default Information;