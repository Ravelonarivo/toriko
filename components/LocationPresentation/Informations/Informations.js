import Information from './Information/Information';
import Opening from './Opening/Opening';

import { Collapse } from 'react-collapse';

const Informations = ({ isInformationsOpened }) => {
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
		<div>
			<Collapse isOpened={ isInformationsOpened } initialStyle={{ height: 'auto', overflow: 'initial', transition: 'height 500ms' }}>
				<div className="dib w-100">
					<Information location={location} />
					<Opening location={location} />
				</div>
			</Collapse>
		</div>
	);
};

export default Informations;