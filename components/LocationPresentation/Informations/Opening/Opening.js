const Opening = ({ openings }) => {
	const formatTime = time => {
		return time.slice(0, 5).replace(':','h');
	}

	const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
	
	return (
		<div className="db dib-ns w-50-l w-100-m fr">
			<div className="flex justify-center">
				<h4 className="f6 fw6 tc ba b--moon-gray w-50 br4 bg-white pv1" style={{ transform: 'translateY(37px)' }}>Horaires d'ouverture</h4>
			</div>
			<div className="bt b--moon-gray ml3 pv4 ph4">
				{
					days.map(day => {
						return openings.map((opening, index) => (
							day === opening.day
								? 	<dl className="f6 lh-title mv2 w-100" key={index}>
										<dt className="dib w-20">{opening.day}</dt>
										<dd className="dib w-70 tr">
											{
												opening.open && opening.close
													? formatTime(opening.open) + '-' + formatTime(opening.close)
													: ' fermé'
											}
										</dd>
									</dl>
								:   ''						
						))
					})
				}
			</div>
		</div>
	);
};

export default Opening;