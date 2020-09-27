const Opening = ({ location }) => {
	return (
		<div className="db dib-ns w-50-l w-100-m fr">
			<div className="flex justify-center">
				<h4 className="f6 fw6 tc ba b--light-silver w-20 br4  absolute bg-white pv1" style={{ zIndex: '1', marginTop: '-19px' }}>Horaires d'ouverture</h4>
			</div>
			<div className="bt b--light-silver ml3 pv4 ph4">
				{
					location.opening.map((opening, index) => (
						<dl className="f6 lh-title mv2 w-100" key={index}>
							<dt className="dib w-20">{opening.day}</dt>
							<dd className="dib w-70 tr">
								{
									opening.from.length
										? opening.from + 'h-' + opening.to + 'h'
										: ' fermé'
								}
							</dd>
						</dl>
					))
				}
			</div>
		</div>
	);
};

export default Opening;