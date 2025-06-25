import { Router } from 'express';
import { UserController } from './controllers/UserController';

export const router: Router = Router();

// Cotrollers
const userController = new UserController();

router.get('/', (_, res) => {
	res.send('Welcome to the GymTracker API!');
});

router.post('/auth/register', async (req, res) => await userController.createUser(req, res));

router.post('/auth/login', async (req, res) => await userController.loginUser(req, res));
