import { LoginReqBody, RegisterReqBody } from '@api/types';
import { v4 as uuidv4 } from 'uuid';
import { Request as expressRequest, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { IUserService } from '@api/interfaces/IUserService';
import { UserService } from '../services/UserService';
import { generateToken } from '../jwt';

export class UserController {
	private readonly _userService: IUserService = new UserService();

	public async createUser(req: expressRequest, res: Response): Promise<void> {
	  try {
			if (!req.body || !req.body.email || !req.body.password) {
				res.status(400).json({
					message: 'Email and password are required',
				});
				return;
			}

			const { username, email, password } = req.body as RegisterReqBody;
			const uuid: string = uuidv4();
      
			const hashedPassword: string = await bcrypt.hash(password, 10);

			const response = await this._userService.createUser(
				uuid,
				username,
				email,
				hashedPassword
			);

			res.status(201).json(response);
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).json({
				error: 'Internal server error',
				message: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}

	public async loginUser(req: expressRequest, res: Response): Promise<void> {
		try {
			const { email, password } = req.body as LoginReqBody;
			const user = await this._userService.loginUser(email, password);

			if (!req.body || !req.body.email || !req.body.password) {
				res.status(400).json({
					message: 'Email and password are required',
				});
				return;
			}

			if (!user) {
				res.status(401).json({
					message: 'Invalid email or password',
				});
				return;
			}

			const generateBearerToken = generateToken(user.id);

			res.status(200).json({
				userId: user.id,
				email: user.email,
				token: generateBearerToken,
			});
		} catch (error) {
			console.error('Error logging in user:', error);
			res.status(500).json({
				error: 'Internal server error',
				message: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}
}
