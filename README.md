# Plant Marketplace
This is a backend project made in ```NestJS``` with ```PostgreSQL``` as its main database and with ```Objection JS``` as its ORM.

---
#### Setup the database ```PostgreSQL```
Before we start with the setup for the database is important to metion that the ORM works too with MySQL or another SQL database but in this case I configure some columns of the database with specific features of PostgreSQL.
**For example:**
- There's a ```migration``` called ```_extensions``` this migration has the purpose in this initial setup to create an extension for the ```uuid``` but in **MySQL** you will need to handle this uuid generation in the ```$beforeInsert``` of **ObjectionJS**\.

#### First thing first
You will need to create a ```.env``` file in the root of the project, you can base your template in this.

[Knex Home Page](https://knexjs.org/)
```
DATABASE_CLIENT=[Your database client you can check this in Knex Home Page that is upside this code block]
DATABASE_HOST=[The host of the database]
DATABASE_NAME=[The name of the database its important you to know this for the next step]
DATABASE_PORT=[The port of the database]
DATABASE_USER=[The user of the database]
DATABASE_PASSWORD=[The password of the previous user of the database]
DATABASE_MIGRATION_TABLE_NAME=knex_migrations [Don't change this value is for migrations]
DATABASE_POOL_MIN=[The min connection pools]
DATABASE_POOL_MAX=[The max connection pools]

API_VERSION=[The version of the API should be a numeric value]
NODE_ENV=[The enviroment of the application]
PORT=[The port to initialize the API should be a numeric value]
```

### Create the database
We have a migrations functions that can handle the creation of the tables inside the database but its important to before run this scripts we have the database created, so for this you need the name of the database that you put in the ```.env``` and you can use both the **console** or the **PGAdmin 4**
```CREATE DATABASE [database-name]```

### Runnning the migrations and seed
You need to run the migrations to be able to see the database structure, and **optional** you can tun the seed scripts too.
```
// The order its important in this case cause you can run the seed without the structure of the database.

yarn db:migrate
yarn db:seed // Optional
```

### Running the API
After the previous configuration you can now run the API, and for that you only needs to run the command ```yarn start:dev``` or ```yarn start``` if you prefer.

>>> Now as exttra information you can look at ```http://localhost:[port-specified]/swagger``` to see the available endpoints or you can load the ```plant-marketplace-rest.json``` to a **Postman App** too.
