import Knex from 'knex';

export async function up(knex: Knex) {
    return await knex.schema.createTable('orphanages', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('latitude', 10, 2).notNullable();
        table.decimal('longitude', 10, 2).notNullable();
        table.string('about').notNullable();
        table.string('instructions').notNullable();
        table.string('opening_hours').notNullable();
        table.boolean('open_on_weekends').defaultTo(false);
    });
}

export async function down(knex: Knex) {
    return await knex.schema.dropTable('orphanages');
}