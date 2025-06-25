import { createContext, ReactNode, useContext, useState } from 'react';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const navigate = useNavigate();

	const login = async (email: string, password: string) => {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const { token } = await response.json();
		setToken(token);
	};

	const logout = () => {
		setToken(null);
		navigate('/');
	};

	return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
