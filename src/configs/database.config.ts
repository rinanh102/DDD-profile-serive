import { DatabaseClient, DatabaseDriver } from '@heronjs/common';
import { CommonDatabaseConfig } from '@heronjs/common/consts/database.consts';
import fs from 'fs';
export const PostgresDatabaseConfiguration = {
    client: DatabaseClient.KNEX,
    config: <CommonDatabaseConfig>{
        host: process.env.POSTGRES_HOST || '178.128.119.213',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        user: process.env.POSTGRES_USER || 'dev',
        password: process.env.POSTGRES_PASSWORD || 'dev@123',
        database: process.env.POSTGRES_DATABASE || 'dev',
        pooling: {
            min: Number(process.env.POSTGRES_POOLING_MIN) || 1,
            max: Number(process.env.POSTGRES_POOLING_MAX) || 2,
        },
        driver: DatabaseDriver.POSTGRES,
        cluster: process.env.POSTGRES_SLAVES
            ? {
                  slaves: process.env.POSTGRES_SLAVES || '',
              }
            : undefined,
        ssl:
            process.env.POSTGRES_TLS_CERT &&
            process.env.POSTGRES_SECURE_CONNECT &&
            process.env.POSTGRES_SECURE_CONNECT.toLowerCase() === 'true'
                ? {
                      ca: fs.readFileSync(process.env.POSTGRES_TLS_CERT).toString('utf-8'),
                      rejectUnauthorized: false,
                      required: true,
                  }
                : undefined,
        tls: {
            ssl: process.env.POSTGRES_TLS_CERT
                ? fs.readFileSync(process.env.POSTGRES_TLS_CERT).toString('utf-8')
                : '',
            enabled:
                process.env.POSTGRES_SECURE_CONNECT &&
                process.env.POSTGRES_SECURE_CONNECT.toLowerCase() == 'true',
        },
    },
};
