import { KnexClient } from '@heronjs/core';
import { Default, UseConfig } from '@heronjs/common';
import { PostgresDatabaseConfiguration } from '../../../../../configs';
import { AbstractKnexDatabaseClient } from '@heronjs/core/database';

@UseConfig(PostgresDatabaseConfiguration)
@Default()
export class PostgresDatabase extends AbstractKnexDatabaseClient<KnexClient> {
    constructor() {
        super();
    }
}
