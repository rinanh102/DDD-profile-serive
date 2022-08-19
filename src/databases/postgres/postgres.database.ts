import { KnexClient } from '@heronjs/core';
import { Default, UseConfig } from '@heronjs/common';
import { AbstractKnexDatabaseClient } from '@heronjs/core/database';
import { PostgresDatabaseConfiguration } from '../../configs';

@UseConfig(PostgresDatabaseConfiguration)
@Default()
export class PostgresDatabase extends AbstractKnexDatabaseClient<KnexClient> {
    constructor() {
        super();
    }
}
