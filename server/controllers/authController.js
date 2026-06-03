import { loginUser, registerUser } from '../services/authService.js';

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const session = await loginUser(req.body);
    return res.json(session);
  } catch (error) {
    return next(error);
  }
}
