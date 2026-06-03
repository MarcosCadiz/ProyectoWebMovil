import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { jwtKeys } from '../config/keys.js';

export function createAccessToken(user) {
  return jwt.sign(
    {
      rut: user.rut,
      role: user.role,
      name: user.name,
    },
    jwtKeys.privateKey,
    {
      algorithm: 'RS256',
      audience: env.jwtAudience,
      expiresIn: env.jwtExpiresIn,
      issuer: env.jwtIssuer,
      keyid: jwtKeys.keyId,
      subject: user.id,
    },
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, jwtKeys.publicKey, {
    algorithms: ['RS256'],
    audience: env.jwtAudience,
    issuer: env.jwtIssuer,
  });
}

export function getPublicJwks() {
  return {
    keys: [jwtKeys.jwk],
  };
}
