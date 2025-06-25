// Types
export type AuthContextType = {
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};