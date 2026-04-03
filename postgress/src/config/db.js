const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
}).on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Executes a parameterized SQL query.
 * @param {string} text - SQL query string with placeholders ($1, $2, ...)
 * @param {any[]} params - Array of parameter values
 * @returns {Promise<import('pg').QueryResult>}
 */
async function query(text = '', params = []) {
    const start = Date.now();

    // Log parameter types to help debug type mismatches (e.g., LIMIT expects bigint)
    const paramTypes = params.map(p => p === null ? 'null' : typeof p);
    console.log('Executing query:', { 
        text: text.substring(0, 200), // truncate long queries
        paramTypes,
        params: params.map(p => p?.toString?.().substring(0, 50)) // preview values
    });

    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Query completed', { duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Error executing query', { 
            text, 
            params: params.map(p => p?.toString?.().substring(0, 50)),
            paramTypes,
            error: error.message 
        });
        throw error;
    }
}

module.exports = {
    query,
    pool
};