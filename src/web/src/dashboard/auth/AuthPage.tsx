import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
				<img
					src="./images/barbell.png"
					alt="GymTracker Logo"
					className="mx-auto mb-5 h-16 w-16 object-contain"
				/>
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900">
						{isLogin ? 'Sign in to your account' : 'Create new account'}
					</h2>
				</div>

				<div className="mt-8">{isLogin ? <LoginForm /> : <RegisterForm />}</div>

				<div className="mt-6 text-center text-sm">
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="font-medium hover:text-[#EAA22F]"
					>
						{isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
					</button>
				</div>
			</div>
		</div>
	);
};
