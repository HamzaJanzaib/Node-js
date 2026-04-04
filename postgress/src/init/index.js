const {PostTable} = require('./postTable');
const { UserTable } = require('./userTables');


async function initializeDatabase() {
    try {
        await UserTable();
        await PostTable();
        await PostTable();

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Execute only if this script is run directly
if (require.main === module) {
    initializeDatabase().catch(console.error);
}

module.exports = { initializeDatabase };