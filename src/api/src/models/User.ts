import pool from '../db';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import * as bcrypt from 'bcryptjs';

type UserQueryResult = {
	id: string;
	name: string;
	email: string;
	password: string;
} & RowDataPacket;

export class User {
	private _id: string;
	private _username: string;
	private _email: string;
	private _password: string;

	constructor(id: string, username: string, email: string, password: string) {
		this._id = id;
		this._username = username;
		this._email = email;
		this._password = password;
	}

	public static async getUserByEmail(email: string, password: string): Promise<User | undefined> {
		const connection: PoolConnection = await pool.getConnection();
		try {
			const [query] = await connection.execute<UserQueryResult[]>(
				'SELECT uuid, name, email, password FROM user WHERE email = ?',
				[email]
			);

			if (query.length === 0) {
				console.log('User not found');
				return undefined;
			}

			const user = query[0] as UserQueryResult;

			const passwordCheck = await bcrypt.compare(password, user.password);
			if (!passwordCheck) {
				console.log('Invalid password');
				return undefined;
			}

			return new User(user.id, user.name, user.email, user.password);
		} catch {
			return undefined;
		} finally {
			connection.release();
		}
	}

	public async create(): Promise<boolean> {
		const connection: PoolConnection = await pool.getConnection();
		try {
			await connection.execute(
				'INSERT INTO user (uuid, name, email, password) VALUES (?, ?, ?, ?)',
				[this._id, this._username, this._email, this._password]
			);

			return true;
		} catch {
			return false;
		} finally {
			connection.release();
		}
	}

	public async remove(): Promise<boolean> {
		const connection: PoolConnection = await pool.getConnection();
		try {
			await connection.execute('DELETE FROM user WHERE uuid = ?', [this._id]);

			return true;
		} catch {
			return false;
		} finally {
			connection.release();
		}
	}

	get id(): string {
		return this._id;
	}

	get username(): string {
		return this._username;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}
}
