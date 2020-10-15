import Knex from 'knex';

export async function up(knex: Knex) {
    return await knex.schema.createTable('images', function (table) {
        table.increments('id').primary();
        table.string('path');

        // Foreign key
        table.integer('orphanage_id')
                .notNullable()
                .references('id')
                .inTable('orphanages')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
    })
}

export async function down(knex: Knex) {
    return await knex.schema.dropTable('images');
}