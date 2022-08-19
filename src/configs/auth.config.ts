export const AuthConfig = {
    authenticationApiUrl: process.env.AUTHENTICATION_API_URL,
    secretKeyInternalAPIAuthentication: process.env.SECRET_KEY_INTERNAL_API_AUTHENTICATION,
    pathJWTPublic: process.env.PATH_JWT_PUBLIC || '/tmp/certs',
};
