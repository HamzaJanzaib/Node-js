const { query } = require('../config/db');

async function PostTable() {
    await query(`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            content TEXT NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('Tables created successfully');
}

// Execute only if this script is run directly
if (require.main === module) {
    PostTable().catch(console.error);
}

module.exports = { PostTable };