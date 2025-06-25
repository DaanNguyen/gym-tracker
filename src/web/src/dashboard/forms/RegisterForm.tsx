import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const RegisterForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = () => {
		const newErrors = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
		let isValid = true;

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
			isValid = false;
		}

		if (!formData.email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
			isValid = false;
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
			isValid = false;
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
			isValid = false;
		} else if (!/[A-Z]/.test(formData.password)) {
			newErrors.password = 'Password must contain at least one uppercase letter';
			isValid = false;
		} else if (!/[0-9]/.test(formData.password)) {
			newErrors.password = 'Password must contain at least one number';
			isValid = false;
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate()) {
			setIsSubmitting(true);
			// Simulate API call
			setTimeout(() => {
				console.log('Registration data:', formData);
				setIsSubmitting(false);
			}, 1000);
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
				<label htmlFor="name" className="block text-sm font-medium text-gray-700">
					Username
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					<input
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						value={formData.name}
						onChange={handleChange}
						className={`block w-full pr-10 ${errors.name ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm focus:outline-none sm:text-sm`}
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? 'name-error' : undefined}
					/>
					{errors.name && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<ExclamationCircleIcon
								className="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
				{errors.name && (
					<p className="mt-2 text-sm text-red-600" id="name-error">
						{errors.name}
					</p>
				)}
			</div>

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
						type="password"
						value={formData.password}
						onChange={handleChange}
						className={`block w-full pr-10 ${errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm focus:outline-none sm:text-sm`}
						aria-invalid={!!errors.password}
						aria-describedby={errors.password ? 'password-error' : undefined}
					/>
					{errors.password && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<ExclamationCircleIcon
								className="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
				{errors.password && (
					<p className="mt-2 text-sm text-red-600" id="password-error">
						{errors.password}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="confirmPassword"
					className="block text-sm font-medium text-gray-700"
				>
					Confirm password
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						value={formData.confirmPassword}
						onChange={handleChange}
						className={`block w-full pr-10 ${errors.confirmPassword ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm focus:outline-none sm:text-sm`}
						aria-invalid={!!errors.confirmPassword}
						aria-describedby={
							errors.confirmPassword ? 'confirmPassword-error' : undefined
						}
					/>
					{errors.confirmPassword && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<ExclamationCircleIcon
								className="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
				{errors.confirmPassword && (
					<p className="mt-2 text-sm text-red-600" id="confirmPassword-error">
						{errors.confirmPassword}
					</p>
				)}
			</div>

			<div>
				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EAA22F] hover:bg-[#b97f23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
				>
					{isSubmitting ? 'Registering...' : 'Register'}
				</button>
			</div>
		</form>
	);
};
