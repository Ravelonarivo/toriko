import Town from './Town';

const TownList = ({ towns, selectTownName, townName }) => {
	return (
		<div>
			<select className="w5 mr2" value={ townName } onChange={ selectTownName }>
				<option value="Quelle est votre ville ?" disabled hidden>Quelle est votre ville ?</option>
				{
					towns.map((town, index) => (
						<Town
							town={ town }
							key={ index }
						/>
					))
				}
			</select>
		</div>
	);
};

export default TownList;