import { Consumer, Logger, OnStart, Service } from '@cbidigital/heron-common';
import { AuthenticationProvider } from '../../infra/providers';

@Service()
export class PullPublicKeyIntervalService {
    private _logger: Logger;

    constructor(private _authenticationProvider: AuthenticationProvider) {
        this._logger = new Logger(PullPublicKeyIntervalService.name);
    }

    @OnStart()
    start = async () => {
        return this._authenticationProvider.pullAllPublicKey();
    };

    @Consumer('pull-new-content-key')
    pullNewContentKey = async () => {
        return this._authenticationProvider.pullAllPublicKey();
    };
}
