import Knex from 'knex';
import { RecordStatus } from '../src/model/types/status.types';
import { DatabaseCustomTypes, Tables, Types } from '../src/database';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Tables.PLANT, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw(DatabaseCustomTypes.UUID));

    table.string('plant_name').notNullable();
    table.string('img_url').notNullable();
    table.string('description', 500).notNullable();

    table.integer('cuantity').notNullable().defaultTo(0);

    table.float('price', 17, 2).notNullable().defaultTo(0);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table
      .enum('status', [RecordStatus.ACTIVE, RecordStatus.UNACTIVE], {
        enumName: Types.STATUS,
        useNative: true,
      })
      .notNullable()
      .defaultTo(RecordStatus.ACTIVE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(Tables.PLANT)
    .raw(`DROP TYPE IF EXISTS ${Types.STATUS}`);
}
