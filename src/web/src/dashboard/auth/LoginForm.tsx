import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const validate = () => {
		const newErrors = {
			email: '',
			password: '',
		};
		let isValid = true;

		if (!formData.email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsSubmitting(true);
		try {
			await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			navigate('/dashboard');
		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user types
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email address
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						value={formData.email}
						onChange={handleChange}
						className={`block w-full pr-10 ${errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm focus:outline-none sm:text-sm`}
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? 'email-error' : undefined}
					/>
					{errors.email && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<ExclamationCircleIcon
								className="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
				{errors.email && (
					<p className="mt-2 text-sm text-red-600" id="email-error">
						{errors.email}
					</p>
				)}
			</div>

			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						autoComplete="current-password"
						value={formData.password}
						onChange={handleChange}
						className={`block w-full pr-10 ${
							errors.password
								? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
								: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
						} rounded-md shadow-sm focus:outline-none sm:text-sm`}
						aria-invalid={!!errors.password}
						aria-describedby={errors.password ? 'password-error' : undefined}
					/>
					{/* Vervang het error icoon door de toggle knop */}
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="text-gray-500 hover:text-gray-700 focus:outline-none"
						>
							{showPassword ? (
								<FaEyeSlash className="h-5 w-5" />
							) : (
								<FaEye className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
				{errors.password && (
					<p className="mt-2 text-sm text-red-600" id="password-error">
						{errors.password}
					</p>
				)}
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm">
					<a href="#" className="font-medium hover:text-[#EAA22F]">
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EAA22F] hover:bg-[#b97f23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
				>
					{isSubmitting ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>
	);
};
