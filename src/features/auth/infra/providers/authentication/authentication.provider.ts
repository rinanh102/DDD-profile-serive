import { CacheLookup, CacheManager, CacheStore, Logger, Provider, Scope } from '@cbidigital/heron-common';
import { HttpClient, IHttpClient } from '@cbidigital/nightcore';
import fs from 'fs';
import { AuthConfig } from '../../../../../configs';
import { PublicKeyDto } from './dto';

const PUBLIC_KEY_TTL = 3 * 60; // 3 minutes

export interface IAuthenticationProvider {
    getPublicKey(tenantId: string): Promise<PublicKeyDto>;

    pullAllPublicKey(): Promise<void>;

    getAllPublicKey(): Promise<Record<string, PublicKeyDto>>;
}

@Provider({ scope: Scope.SINGLETON })
export class AuthenticationProvider implements IAuthenticationProvider {
    private _logger: Logger;
    private _httpClient: IHttpClient<any>;
    private readonly _cacheManager: CacheManager;

    constructor(@CacheLookup() readonly cacheStore: CacheStore) {
        if (!AuthConfig.authenticationApiUrl) {
            throw Error('Not found AUTHENTICATION_API_URL');
        }
        this._httpClient = new HttpClient(AuthConfig.authenticationApiUrl);
        this._cacheManager = cacheStore.get();
        this._logger = new Logger(AuthenticationProvider.name);
    }

    async getPublicKey(tenantId: string): Promise<PublicKeyDto> {
        const key = 'public-key-tenant-id:' + tenantId;
        let publicKey = await this._cacheManager.get(key);
        if (publicKey) return publicKey;

        const data = await this._httpClient.get<{
            data: PublicKeyDto;
        }>(
            '/authentication/keys/public',
            {},
            {
                headers: {
                    'x-tenant-id': tenantId,
                    'internal-api-key': AuthConfig.secretKeyInternalAPIAuthentication,
                },
            },
        );
        publicKey = data.data.data;
        if (publicKey) this._cacheManager?.set(key, publicKey, { ttl: PUBLIC_KEY_TTL });
        return publicKey;
    }

    async pullAllPublicKey() {
        const publicKeys = await this.getAllPublicKey();
        const ops = Object.keys(publicKeys).map(async (tenantId) => {
            const publicKey = publicKeys[tenantId];
            await this.storePublicKey(tenantId, publicKey);
        });
        await Promise.all(ops);
        this._logger.info('pull all public key successful');
    }

    async getAllPublicKey(): Promise<Record<string, PublicKeyDto>> {
        const key = 'all-public-key';
        let publicKeys = await this._cacheManager.get(key);
        if (publicKeys) return publicKeys;

        const data = await this._httpClient.get<{
            data: Record<string, PublicKeyDto>;
        }>(
            '/authentication/keys/public/all',
            {},
            {
                headers: {
                    'internal-api-key': AuthConfig.secretKeyInternalAPIAuthentication,
                },
            },
        );
        publicKeys = data.data.data;
        if (publicKeys) this._cacheManager?.set(key, publicKeys, { ttl: PUBLIC_KEY_TTL });
        return publicKeys;
    }

    private async storePublicKey(tenantId: string, publicKey: PublicKeyDto) {
        const dir = `${AuthConfig.pathJWTPublic}/${tenantId}`;
        const path = `${dir}/jwt.pub`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path, JSON.stringify(publicKey), { encoding: 'utf8' });
        this._logger.info(`save file public key tenant ${tenantId} success`);
    }
}
