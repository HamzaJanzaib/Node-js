function getPaginationOffset(page, limit) {
    return (page - 1) * limit;
}

module.exports = { getPaginationOffset };