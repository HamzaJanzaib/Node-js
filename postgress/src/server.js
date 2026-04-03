const dotenv = require('dotenv');
dotenv.config();

const { createTables } = require('./concepts/user-queries');


async function startServer() {
    try {
        await createTables();
        console.log('Server is running and ready to accept requests');
    } catch (error) {
        console.error('Error starting server', error);
        process.exit(1);
    }
}

startServer();