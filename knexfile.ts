import * as dotenv from 'dotenv';
dotenv.config();

import { Config } from 'knex';
import { loadKnexConfigFromEnv } from './src/config/database.config';

const config = loadKnexConfigFromEnv();

const createKnexConfig = (seedsFolder: string): Config => ({
  ...config,
  seeds: {
    directory: `./seeds/${seedsFolder}`,
  },
});

module.exports = {
  development: createKnexConfig('development'),
};
