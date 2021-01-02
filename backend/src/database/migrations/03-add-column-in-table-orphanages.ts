import Knex from 'knex';

export async function up(knex: Knex) {
    return await knex.schema.table('orphanages', function (table) {
        table.boolean('pending').defaultTo(true);
    });
}

export async function down(knex: Knex) {
    return await knex.schema.table('orphanages', function (table) {
        table.dropColumn('pending');
    });
}