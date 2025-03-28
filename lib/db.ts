import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
	user: 'admin',
	host: 'localhost',
	database: 'carshop2',
	password: 'secret1',
	port: 5434,
});
