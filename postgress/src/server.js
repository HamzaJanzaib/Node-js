const dotenv = require('dotenv');
dotenv.config();
const { initializeDatabase } = require('./init');
// Import from modular services
const { createUser, getAllUsers } = require('./services/userService');
const { createPost, getAllPosts, getPostsByUserId } = require('./services/postService');



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

async function createPostsForUsers(users) {
    const postsData = [
        { title: 'My First Post', content: 'Hello world!', user_id: users[0].id },
        { title: 'Learning PostgreSQL', content: 'It is powerful', user_id: users[0].id },
        { title: 'Node.js Tips', content: 'Modularize your code', user_id: users[1].id },
        { title: 'Express Basics', content: 'Middleware is key', user_id: users[1].id },
        { title: 'Database Design', content: 'Normalize your data', user_id: users[2].id }
    ];

    const createdPosts = [];
    for (const postData of postsData) {
        try {
            const post = await createPost(postData);
            createdPosts.push(post);
            console.log(`✅ Created post: "${post.title}" by user ${post.user_id}`);
        } catch (error) {
            console.error(`❌ Failed to create post: ${postData.title}`, error.message);
        }
    }
    return createdPosts;
}

async function fetchAndDisplayData() {
    // console.log('\n📋 All users (first page, 10 per page):');
    // const allUsers = await getAllUsers(1, 10);
    // console.table(allUsers);

    // console.log('\n📝 All posts with user details (search for "PostgreSQL"):');
    // const postsWithSearch = await getAllPosts(1, 10, 'created_at', 'DESC', '', 'PostgreSQL');
    // console.table(postsWithSearch);

    // console.log('\n📝 Posts by user John Doe (assuming id = 1):');
    // const johnPosts = await getPostsByUserId(1);
    // console.table(johnPosts);

    console.log('\n📄 Paginated posts – page 1, limit 2:');
    const paginatedPosts = await getAllPosts(1, 2, 'created_at', 'DESC');
    console.table(paginatedPosts);
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
        // await initializeDatabase();
        // await createMultipleUsers();
        // await fetchAndDisplayUsers();
        // await createPostsForUsers(await getAllUsers(1, 10)); // Create posts for the first 10 users
        await fetchAndDisplayData();
        console.log('\n🚀 Server is running and ready to accept requests');
    } catch (error) {
        console.error('❌ Error starting server', error);
        process.exit(1);
    }
}

startServer();