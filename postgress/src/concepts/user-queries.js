const {query} = require('../config/db');

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

async function getAllUsers(page = 1, limit = 10 , sortBy = 'created_at', sortOrder = 'DESC' , condition = '', search = '') {
    const offset = (page - 1) * limit;

    const res = await query(`SELECT * FROM users ${condition ? `WHERE ${condition}` : ''} ${search ? `AND (name ILIKE '%${search}%' OR email ILIKE '%${search}%')` : ''} ORDER BY ${sortBy} ${sortOrder} LIMIT $1 OFFSET $2`, [limit, offset]);
    return res.rows;
}

async function getUserById(id) {
    const res = await query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
}

async function createUser(data , multiple = false) {
    if (multiple) {
        const values = data.map(user => `('${user.name}', '${user.email}')`).join(', ');

        const res = await query(`INSERT INTO users (name, email) VALUES ${values} RETURNING *`);
        return res.rows;
    } else {
        const res = await query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);
        return res.rows[0];
    }
}

async function deleteUser(id) {
    await query('DELETE FROM users WHERE id = $1', [id]);
    console.log(`User with id ${id} deleted successfully`);
}

async function updateUser(id, data ) {
    const res = await query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.email, id]);
    return res.rows[0];
}

module.exports = {
    createTables,
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};