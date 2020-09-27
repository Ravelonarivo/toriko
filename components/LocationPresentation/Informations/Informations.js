import Information from './Information/Information';
import Opening from './Opening/Opening';

const Informations = () => {
	const location = {
		type: 'Restaurant',
		speciality: 'Chinoise',
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
		  	<Information location={ location } />
		  	<Opening location={ location } />
		</div>
	);
};

export default Informations;