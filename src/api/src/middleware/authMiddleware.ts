import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@api/jwt';

/**
 * Authenticates requests using JWT from Authorization header
 *
 * @param req - Gets userId property if successful
 * @param res - Handles error responses
 * @param next - Called on successful auth
 *
 * @returns Nothing - Either calls next() or sends error response
 *
 * @throws 401 - If no token provided
 * @throws 403 - If token is invalid/expired
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers['authorization'];
	const token = authHeader?.split(' ')[1];

	if (!token) {
		res.status(401).json({ error: 'Need token!' });
		return;
	}

	try {
		const payload = verifyToken(token);
		req.userId = payload.userId;
		next();
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Invalid token';
		res.status(403).json({ error: errorMessage });
		return;
	}
};
