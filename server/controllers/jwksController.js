import { getPublicJwks } from '../services/tokenService.js';

export function jwks(req, res) {
  return res.json(getPublicJwks());
}
