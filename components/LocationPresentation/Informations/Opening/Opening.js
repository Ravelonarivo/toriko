const Opening = ({ openings }) => {
	const formatTime = time => {
		return time.slice(0, 5).replace(':','h');
	}

	const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
	
	return (
		<div className="db dib-ns w-50-l w-100-m fr">
			<h4 className="f6 fw6 bg-white mt4 bb b--moon-gray">Horaires d'ouverture</h4>
			<div>
				{
					days.map(day => {
						return openings.map((opening, index) => (
							day === opening.day
								? 	<p className="f6 lh-title mv2 w-100" key={index}>
										<span className="dib w-20">{opening.day}</span>
										<span className="dib w-80 tr">
											{
												opening.open && opening.close
													? formatTime(opening.open) + '-' + formatTime(opening.close)
													: ' fermé'
											}
										</span>
									</p>
								:   ''						
						))
					})
				}
			</div>
		</div>
	);
};

export default Opening;