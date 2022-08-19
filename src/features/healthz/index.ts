import { Module } from '@cbidigital/heron-common';
import { HealthCheckControllers } from './app/controllers';

@Module({
    controllers: [HealthCheckControllers],
})
export class HealthCheckModule {}
