import { generateKeyPairSync } from 'node:crypto';

const keyId = `dom-api-${Date.now()}`;

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const publicJwk = publicKey.export({ format: 'jwk' });

export const jwtKeys = {
  keyId,
  privateKey,
  publicKey,
  jwk: {
    ...publicJwk,
    kid: keyId,
    use: 'sig',
    alg: 'RS256',
    key_ops: ['verify'],
  },
};
