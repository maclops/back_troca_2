/*
module.exports = {
    userWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM users WHERE id = ?
            UNION ALL
            SELECT p.id FROM subcategories, products p
                WHERE "productId" = subcattegories.id
        )
        SELECT id FROM subcategories
    `
}
*/