import knex from 'knex';

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'Postgres4#',
		database: 'resto-food'
	}
});

export default db;