const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

}).on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function Query(text = '', params = []) {
    const start = Date.now();

    try {
        const res = await pool.query(text, params);

        const duration = Date.now() - start;

        console.log('executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Error executing query', { text, params, error });
        throw error;
    }
    
}

module.exports = {
    query: Query,
    pool
};
