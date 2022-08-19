import { AuthResolver, JWTToken, SecureContext, SecureProperty } from '@heronjs/common';
import { Observable, of } from 'rxjs';
import { getContentFileString, InvalidTokenError, JwtUtil, UnauthorizedError } from '@cbidigital/nightcore';
import { AuthConfig } from '../configs';

export type SecurityType = {
    private?: boolean;
    roles?: string[];
    permissions?: string[];
};

export class AuthContext implements SecureContext<SecurityType, SecureProperty> {
    OnGuard(data: SecurityType): Observable<SecureProperty> {
        console.log('SecureProperty', data);
        return of(data as any);
    }

    static Resolver: AuthResolver<SecurityType> = {
        http: ['header', 'authorization'],
        ws: ['handshake', 'token'],

        resolve: async (data?: string): Promise<SecurityType> => {
            return this.verifyJwt(data);
        },
    };

    private static verifyJwt = async (authorization?: string): Promise<SecurityType> => {
        if (!authorization) {
            throw new UnauthorizedError();
        }
        const token = authorization.substring(authorization.indexOf('Bearer ') + 'Bearer '.length);
        if (!token) {
            throw new InvalidTokenError();
        }
        const decodeToken: JWTToken = JwtUtil.decode(token) as JWTToken;
        if (!decodeToken) {
            throw new InvalidTokenError();
        }
        const tenantId = decodeToken.tenant;
        if (!tenantId) {
            throw new InvalidTokenError();
        }
        const pathPublicKey = `${AuthConfig.pathJWTPublic}/${tenantId}/jwt.pub`;
        let contentFile;
        try {
            contentFile = await getContentFileString(pathPublicKey);
        } catch (error) {
            throw new InvalidTokenError();
        }
        const publicKey: any = JSON.parse(contentFile);
        const tokenPayload: JWTToken = await JwtUtil.verify(token, publicKey.key);
        return tokenPayload.permissions
            ? {
                  roles: tokenPayload.roles,
                  permissions: tokenPayload.permissions,
              }
            : { private: true };
    };
}
