# Instruction

---

## Unit Testing

Please create the test file [JestJS](https://jestjs.io) format inside folder `specs`

```
npm run test
```

## Database Migration

The `knexfile.js` is the setup file for database connection before running any migration commands.

-   Create new migration for a table.
    ```shell
    knex migrate:make <action_table_name>
    ```
-   Migration all tables in migrations directory:

    ```shell
    knex migrate:latest
    ```

-   Take down a migration command

    ```shell
    knex migrate:down
    ```

-   Rollback a migration command

    ```shell
    knex migrate:rollback
    ```

-   Create data seed for a table

    ```shell
    knex seed:make <data_table_name>
    ```

-   Run all seeds in migration seeds directory:

    ```shell
    knex seed:run
    ```

## Debugging

Run the command below and connect your debug client with the url

```shell
 npm run debug
```

---

> `Knex` and `Jest` are Javascript libraries but All the sources code inside `src` folder must be `Typescript`.
