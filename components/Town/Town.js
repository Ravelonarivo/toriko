 import Card from 'react-bootstrap/Card';

 const Town = ({ town, selectTownName }) => {
	return (
		<div>
			<Card 
				style={{ width: '18rem', cursor: 'pointer' }} 
				className="text-center p-3 m-1"
				onClick={ selectTownName }
			>
				<Card.Body>
					<Card.Title style={{ textTransform: 'uppercase' }}>{ town.name }</Card.Title>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Town;