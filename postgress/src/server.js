const dotenv = require('dotenv');
dotenv.config();

const { createTables , createUser } = require('./concepts/user-queries');

async function initializeDatabase() {
    try {
        await createTables();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database', error);
        process.exit(1);
    }   
}

async function CreateUsers () {
    try {
        const user1 = await
            createUser('John Doe', "john.doe@example.com");
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user', error);
    }
}

async function startServer() {
    try {
        await initializeDatabase();
        await CreateUsers();
        console.log('Server is running and ready to accept requests');
    } catch (error) {
        console.error('Error starting server', error);
        process.exit(1);
    }
}

startServer();