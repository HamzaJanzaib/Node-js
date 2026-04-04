const { query } = require('../config/db');

async function getAllPostsRaw({ limit, offset, orderBy, orderDir, whereClause, whereValues }) {
    const wherePart = whereClause ? `WHERE ${whereClause}` : '';
    const valueCount = whereValues?.length || 0;
    const limitPlaceholder = valueCount + 1;
    const offsetPlaceholder = valueCount + 2;

    // INNER JOIN must come before WHERE, ORDER BY, LIMIT, OFFSET
    const sql = `
        SELECT posts.*, users.name as user_name, users.email as user_email 
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        ${wherePart}
        ORDER BY ${orderBy} ${orderDir}
        LIMIT $${limitPlaceholder} OFFSET $${offsetPlaceholder}
    `;
    const values = [...(whereValues || []), limit, offset];
    const res = await query(sql, values);
    return res.rows;
}

async function getPostByUserId(user_id) {
    const res = await query('SELECT * FROM posts WHERE user_id = $1', [user_id]);
    return res.rows;
}

async function getPostById(id) {
    const res = await query('SELECT * FROM posts WHERE id = $1', [id]);
    return res.rows[0];
}

async function createPost(postData) {
    const { title, content, user_id } = postData;
    const res = await query(
        'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, content, user_id]
    );
    return res.rows[0];
}

async function createMultiplePosts(postsArray) {
    if (!postsArray.length) return [];
    const values = postsArray.map((_, idx) => `($${idx * 3 + 1}, $${idx * 3 + 2}, $${idx * 3 + 3})`).join(', ');
    const flatValues = postsArray.flatMap(p => [p.title, p.content, p.user_id]);
    const res = await query(
        `INSERT INTO posts (title, content, user_id) VALUES ${values} RETURNING *`,
        flatValues
    );
    return res.rows;
}

async function updatePost(id, postData) {
    const { title, content } = postData;
    const res = await query(
        'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id]
    );
    return res.rows[0];
}

async function deletePost(id) {
    await query('DELETE FROM posts WHERE id = $1', [id]);
}

module.exports = {
    getAllPostsRaw,
    getPostById,
    createPost,
    createMultiplePosts,
    updatePost,
    deletePost,
    getPostByUserId
};