import db from './db';

export const getTowns = () => {
	return db.select('*').from('town')
		.then(towns => towns)
		.catch(error => console.log(error));
};

export const getTownByName = townName => {
	return db('town').where('name', townName).select('*')
		.then(town => town)
		.catch(error => console.log(error))
};
