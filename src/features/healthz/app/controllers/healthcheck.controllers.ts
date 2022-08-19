import { Controller, Get } from '@cbidigital/heron-common';
import { Observable, of } from 'rxjs';

@Controller('/healthz')
export class HealthCheckControllers {
    @Get({ uri: '/liveness' })
    public async liveness(): Promise<any> {
        return { status: 'ok' };
    }

    @Get({ uri: '/readiness' })
    public readiness(): Observable<any> {
        return of({ status: 'ok' });
    }
}
