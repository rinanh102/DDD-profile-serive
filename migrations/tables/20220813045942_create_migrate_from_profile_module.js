const AuthorizationModuleMigration = require('@cbidigital/profile-module/migrations');

exports.up = async (knex) => {
    await AuthorizationModuleMigration.upAll(knex);
};

exports.down = async (knex) => {
    await AuthorizationModuleMigration.downAll(knex);
};
