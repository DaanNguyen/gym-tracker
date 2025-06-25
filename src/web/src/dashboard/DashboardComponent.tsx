import { useNavigate } from 'react-router-dom';

export function Dashboard() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Navigation Bar */}
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<h1 className="text-xl font-bold text-indigo-600">GymTracker</h1>
							</div>
						</div>
						<div className="flex items-center">
							<span className="text-gray-600 mr-4">Welcome, test</span>
							<button
								// onClick={handleLogout}
								className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign out
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="py-10">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="px-4 py-8 sm:px-0">
						<div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-6">
								Your Dashboard
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{/* Workout Summary Card */}
								<div className="bg-white overflow-hidden shadow rounded-lg">
									<div className="px-4 py-5 sm:p-6">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Recent Workouts
										</h3>
										<div className="mt-2 text-3xl font-semibold text-indigo-600">
											5
										</div>
										<p className="mt-1 text-sm text-gray-500">Last 7 days</p>
									</div>
								</div>

								{/* Progress Card */}
								<div className="bg-white overflow-hidden shadow rounded-lg">
									<div className="px-4 py-5 sm:p-6">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Progress
										</h3>
										<div className="mt-2 text-3xl font-semibold text-green-600">
											+12%
										</div>
										<p className="mt-1 text-sm text-gray-500">
											Since last month
										</p>
									</div>
								</div>

								{/* Quick Actions Card */}
								<div className="bg-white overflow-hidden shadow rounded-lg">
									<div className="px-4 py-5 sm:p-6">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Quick Actions
										</h3>
										<div className="mt-4 space-y-4">
											<button
												onClick={() => navigate('/workouts/new')}
												className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
											>
												Add Workout
											</button>
											<button
												onClick={() => navigate('/profile')}
												className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
											>
												View Profile
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* Recent Activity Section */}
							<div className="mt-10">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Recent Activity
								</h3>
								<div className="bg-white shadow overflow-hidden sm:rounded-md">
									<ul className="divide-y divide-gray-200">
										{[1, 2, 3].map((item) => (
											<li key={item}>
												<div className="px-4 py-4 sm:px-6">
													<div className="flex items-center justify-between">
														<p className="text-sm font-medium text-indigo-600 truncate">
															Workout #{item} completed
														</p>
														<div className="ml-2 flex-shrink-0 flex">
															<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																Completed
															</p>
														</div>
													</div>
													<div className="mt-2 sm:flex sm:justify-between">
														<div className="sm:flex">
															<p className="flex items-center text-sm text-gray-500">
																{item} day{item !== 1 ? 's' : ''}{' '}
																ago
															</p>
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
