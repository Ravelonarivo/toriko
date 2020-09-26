const LocationInformation = () => {
	const location = {
		address: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
		phone: '77 650 44 10',
		delivery: true,
		opening: [
			{
				day: 'lundi', 
				from: '10',
				to: '20'
			},
			{
				day: 'mardi',
				from: '10',
				to: '20',
			},
			{
				day: 'mercredi', 
				from: '10',
				to: '20'
			},
			{
				day: 'jeudi',
				from: '10',
				to: '20',
			},
			{
				day: 'vendredi',
				from: '10',
				to: '20',
			},
			{
				day: 'samedi', 
				from: '10',
				to: '22'
			},
			{
				day: 'dimanche',
				from: '',
				to: '',
			}

		]
	};
	return (
		<div className="w-100 mt5">
		  	<div className="db dib-ns w-50-l w-100-m fl">
		  		<div className="flex justify-center">
		  			<h4 className="f6 fw6 tc ba b--light-silver w-20 br4 absolute bg-white pv1" style={{ zIndex: '1', marginTop: '-19px' }}>Informations</h4>
				</div>
				<div className="bt b--light-silver mr3 pv4 ph4">
					<dl className="f6 lh-title mv2">
						<dt className="dib">Adresse : </dt>
						<dd className="dib ml3">{location.address}</dd>
					</dl>
					<dl className="f6 lh-title mv2">
						<dt className="dib">Phone : </dt>
						<dd className="dib ml3">{location.phone}</dd>
					</dl>
					<dl className="f6 lh-title mv2">
						<dt className="dib">Livraison : </dt>
						<dd className="dib ml3">{location.delivery ? 'oui' : 'non'}</dd>
					</dl>	
				</div>
		  	</div>
		  	<div className="db dib-ns w-50-l w-100-m fr">
		  		<div className="flex justify-center">
		  			<h4 className="f6 fw6 tc ba b--light-silver w-20 br4  absolute bg-white pv1" style={{ zIndex: '1', marginTop: '-19px' }}>Horaires d'ouverture</h4>
		    	</div>
		    	<div  className="bt b--light-silver ml3 pv4 ph4">
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
		</div>
	);
};

export default LocationInformation;