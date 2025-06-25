import { UserType } from '@api/types';

export interface IUserService {
	createUser(userId: string, username: string, email: string, password: string): Promise<boolean>;
	loginUser(email: string, password: string): Promise<UserType | undefined>;
	// updateUser(userId: string, email?: string, password?: string): Promise<any>;
	// deleteUser(userId: string): Promise<any>;
}
