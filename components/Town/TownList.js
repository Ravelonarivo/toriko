import Town from './Town';
import CardColumns from 'react-bootstrap/CardDeck';

const TownList = ({ towns, selectTownName }) => {
	return (
		<div>
			<h1>Choisissez votre ville</h1>
			<CardColumns>
				{
					towns.map((town, index) => (
						<Town
							town={ town }
							selectTownName={ selectTownName }
							key={ index }
						/>
					))
				}
			</CardColumns>
		</div>
	)
};

export default TownList;