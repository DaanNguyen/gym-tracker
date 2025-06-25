// Types
export type UserType = {
	id: string;
	username: string;
	email: string;
	password: string;
};

// Interfaces
export interface RegisterReqBody {
	username: string;
	email: string;
	password: string;
}

export interface LoginReqBody {
	email: string;
	password: string;
}
