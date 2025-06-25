import { IUserService } from '@api/interfaces/IUserService';
import { User } from '../models/User';
import { UserType } from '@api/types';

export class UserService implements IUserService {
  public async createUser(
    userId: string,
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const response = await new User(userId, username, email, password).create();
    if (!response) throw new Error('Failed to create user');
    return response;
  }

	// getUserById(userId: string): Promise<any> {
	//   throw new Error("Method not implemented.");
	// }

	// updateUser(userId: string, email?: string, password?: string): Promise<any> {
	//   throw new Error("Method not implemented.");
	// }

	// deleteUser(userId: string): Promise<any> {
	//   throw new Error("Method not implemented.");
	// }

	public async loginUser(email: string, password: string): Promise<UserType | undefined> {
		const response = await User.getUserByEmail(email, password);
		if (!response) throw new Error('Invalid email or password');
		return response;
	}
}
