const postModel = require('../models/postModel');
const { getPaginationOffset } = require('../utils/pagination');

function buildWhereClause(condition, search) {
    const clauses = [];
    const values = [];

    if (condition) {
        clauses.push(`(${condition})`);
    }

    if (search) {
        clauses.push(`(posts.title ILIKE $${values.length + 1} OR posts.content ILIKE $${values.length + 1})`);
        values.push(`%${search}%`);
    }

    const whereClause = clauses.length ? clauses.join(' AND ') : '';
    return { whereClause, whereValues: values };
}

async function getAllPosts(page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'DESC', condition = '', search = '') {
    const offset = getPaginationOffset(page, limit);
    const { whereClause, whereValues } = buildWhereClause(condition, search);
    
    return await postModel.getAllPostsRaw({
        limit,
        offset,
        orderBy: sortBy,
        orderDir: sortOrder,
        whereClause,
        whereValues
    });
}

async function getPostById(id) {
    return await postModel.getPostById(id);
}

async function getPostsByUserId(userId) {
    return await postModel.getPostByUserId(userId);
}

async function createPost(postData) {
    return await postModel.createPost(postData);
}

async function createMultiplePosts(postsArray) {
    return await postModel.createMultiplePosts(postsArray);
}

async function updatePost(id, postData) {
    return await postModel.updatePost(id, postData);
}

async function deletePost(id) {
    await postModel.deletePost(id);
    console.log(`Post with id ${id} deleted successfully`);
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByUserId,
    createPost,
    createMultiplePosts,
    updatePost,
    deletePost
};