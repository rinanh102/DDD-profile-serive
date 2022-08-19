import 'reflect-metadata';
import { HeronJS } from '@heronjs/core';
import { AppModule } from './app.module';
import { GlobalApiErrorInterceptor } from './interceptors/global-error.interceptor';

const main = async () => {
    const app = await HeronJS.create({ module: AppModule });
    app.listen({
        port: 3000,
        options: {
            cors: {
                origin: '*',
                preflightContinue: false,
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            },
            globalError: GlobalApiErrorInterceptor,
            uri: '/api',
        },
    });
    return app;
};

(async () => main())();
