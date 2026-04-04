const dotenv = require('dotenv');
dotenv.config();
const { initializeDatabase } = require('./init');
// Import from modular services
const { createUser, getAllUsers } = require('./services/userService');



async function createMultipleUsers() {
    const usersData = [
        { name: 'John Doe', email: 'john.doe@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Alice Johnson', email: 'alice.j@example.com' },
        { name: 'Bob Brown', email: 'bob.brown@example.com' },
        { name: 'Charlie Davis', email: 'charlie.d@example.com' }
    ];

    const createdUsers = [];
    for (const userData of usersData) {
        try {
            const user = await createUser(userData);
            createdUsers.push(user);
            console.log(`✅ Created user: ${user.name} (${user.email})`);
        } catch (error) {
            console.error(`❌ Failed to create user ${userData.email}:`, error.message);
        }
    }
    return createdUsers;
}

async function fetchAndDisplayUsers() {
    console.log('\n📋 Fetching all users (first page, 10 per page, sorted by created_at DESC):');
    const allUsers = await getAllUsers(1, 10, 'created_at', 'DESC');
    console.table(allUsers);

    console.log('\n🔍 Searching for users with name containing "John":');
    const searchedUsers = await getAllUsers(1, 10, 'name', 'ASC', '', 'John');
    console.table(searchedUsers);

    console.log('\n📄 Pagination example - Page 2 (2 users per page):');
    const paginatedUsers = await getAllUsers(2, 2, 'id', 'ASC');
    console.table(paginatedUsers);
}

async function startServer() {
    try {
        await initializeDatabase();
        // await createMultipleUsers();
        await fetchAndDisplayUsers();
        console.log('\n🚀 Server is running and ready to accept requests');
    } catch (error) {
        console.error('❌ Error starting server', error);
        process.exit(1);
    }
}

startServer();