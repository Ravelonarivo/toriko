import Town from './Town';

const TownList = ({ towns, selectTownName }) => {
	return (
		<div>
			<h1>Choisissez votre ville</h1>
			<div>
				{
					towns.map((town, index) => (
						<Town
							town={ town }
							selectTownName={ selectTownName }
							key={ index }
						/>
					))
				}
			</div>
		</div>
	);
};

export default TownList;