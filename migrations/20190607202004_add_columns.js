exports.up = function (knex, Promise) {
    return knex.schema.table('products', table => {
        table.string('type').notNull().defaultTo('Usado');
        table.string('brand').notNull().defaultTo('Usado');
    })
};
exports.down = function (knex, Promise) {
    return knex.schema.table('products', table => {
        table.dropColumn('type');
        table.dropColumn('brand');
    })
};