const userModel = require('../models/userModel');
const { getPaginationOffset } = require('../utils/pagination');

// Helper: safely build WHERE clause for search + additional condition
function buildWhereClause(condition, search) {
    const clauses = [];
    const values = [];

    if (condition) {
        // condition is expected to be a safe string like "age > 18" – no user input directly.
        // For extra safety, you could validate against allowed columns.
        clauses.push(`(${condition})`);
    }

    if (search) {
        clauses.push(`(name ILIKE $${values.length + 1} OR email ILIKE $${values.length + 1})`);
        values.push(`%${search}%`);
    }

    const whereClause = clauses.length ? clauses.join(' AND ') : '';
    return { whereClause, whereValues: values };
}

async function getAllUsers(page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'DESC', condition = '', search = '') {
    const offset = getPaginationOffset(page, limit);
    const { whereClause, whereValues } = buildWhereClause(condition, search);

    return await userModel.getAllUsersRaw({
        limit,
        offset,
        orderBy: sortBy,
        orderDir: sortOrder,
        whereClause,
        whereValues
    });
}

async function getUserById(id) {
    return await userModel.getUserById(id);
}

async function createUser(data, multiple = false) {
    if (multiple) {
        return await userModel.createMultipleUsers(data);
    } else {
        return await userModel.createUser(data);
    }
}

async function updateUser(id, data) {
    return await userModel.updateUser(id, data);
}

async function deleteUser(id) {
    await userModel.deleteUser(id);
    console.log(`User with id ${id} deleted successfully`);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};