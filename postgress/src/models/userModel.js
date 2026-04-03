const { query } = require('../config/db');

async function getAllUsersRaw({ limit, offset, orderBy, orderDir, whereClause, whereValues }) {
    const wherePart = whereClause ? `WHERE ${whereClause}` : '';
    // Calculate placeholder indices for LIMIT and OFFSET
    const valueCount = whereValues?.length || 0;
    const limitPlaceholder = valueCount + 1;
    const offsetPlaceholder = valueCount + 2;

    const sql = `
        SELECT * FROM users
        ${wherePart}
        ORDER BY ${orderBy} ${orderDir}
        LIMIT $${limitPlaceholder} OFFSET $${offsetPlaceholder}
    `;
    const values = [...(whereValues || []), limit, offset];
    const res = await query(sql, values);
    return res.rows;
}

async function getUserById(id) {
    const res = await query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
}

async function createUser(userData) {
    const { name, email } = userData;
    const res = await query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return res.rows[0];
}

async function createMultipleUsers(usersArray) {
    if (!usersArray.length) return [];
    const values = usersArray.map((_, idx) => `($${idx * 2 + 1}, $${idx * 2 + 2})`).join(', ');
    const flatValues = usersArray.flatMap(u => [u.name, u.email]);
    const res = await query(
        `INSERT INTO users (name, email) VALUES ${values} RETURNING *`,
        flatValues
    );
    return res.rows;
}

async function updateUser(id, userData) {
    const { name, email } = userData;
    const res = await query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
    );
    return res.rows[0];
}

async function deleteUser(id) {
    await query('DELETE FROM users WHERE id = $1', [id]);
}

module.exports = {
    getAllUsersRaw,
    getUserById,
    createUser,
    createMultipleUsers,
    updateUser,
    deleteUser
};