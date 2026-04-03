const { query } = require('../config/db');

async function createTables() {
    await query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('Tables created successfully');
}

// Execute only if this script is run directly
if (require.main === module) {
    createTables().catch(console.error);
}

module.exports = { createTables };