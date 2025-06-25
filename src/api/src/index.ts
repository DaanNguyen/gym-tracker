import express, { Express } from 'express';
import { router } from './routes';
import cors from 'cors';
import { config } from 'dotenv';
import 'tsconfig-paths/register';

config();

const app: Express = express();

app.use(
	cors({
		credentials: true,
		origin(requestOrigin, callback) {
			callback(null, requestOrigin);
		},
	})
);

app.use(express.json());

app.use('/', router);

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
