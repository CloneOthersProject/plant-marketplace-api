import Knex from 'knex';
import { range } from 'lodash';
import { generateRandomPlant } from '../fake-data.seed';
import { Tables } from '../../src/database';

const insertRandomPlants = async (knex: Knex) => {
  const plants = range(25).map(() => generateRandomPlant());

  await Promise.all(
    plants.map(async (plant) => await knex(Tables.PLANT).insert(plant)),
  );
};

export async function seed(knex: Knex): Promise<void> {
  knex(Tables.PLANT).delete();
  await insertRandomPlants(knex);
}
