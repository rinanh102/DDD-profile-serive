import { APIError, Errors, HttpResponseUtils, isString, Logger, RuntimeError } from '@heronjs/common';
import { ExpressErrorInterceptor, HttpRequest, HttpResponse, Next } from '@heronjs/express';
import { StatusCodes } from 'http-status-codes';

const GlobalApiErrorInterceptor: ExpressErrorInterceptor = (
    err: Error,
    req: HttpRequest,
    res: HttpResponse,
    next: Next,
) => {
    if (err) {
        const logger = new Logger('GlobalApiErrorInterceptor');
        logger.error(err.message, err);

        if (err instanceof APIError) {
            const cin = isString(err.code) ? +err.code : err.code;
            return res.status(cin).send(HttpResponseUtils.error(err));
        }

        const runtimeError = err as RuntimeError;
        if (runtimeError.name && runtimeError.code) {
            let cin = StatusCodes.INTERNAL_SERVER_ERROR;
            let details;

            if (runtimeError.name === Errors.VALIDATION_ERR) {
                cin = StatusCodes.BAD_REQUEST;
                details = runtimeError.payload;
            } else if (runtimeError.code === 10000) cin = StatusCodes.NOT_FOUND;

            return res.status(cin).send({ ...HttpResponseUtils.error(runtimeError), details });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }

    return next();
};

export { GlobalApiErrorInterceptor };
