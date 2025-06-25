import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { LoginForm } from "./dashboard/forms/LoginForm"
import { Dashboard } from './dashboard/DashboardComponent';
import { AuthPage } from './dashboard/auth/AuthPage';
import { RegisterForm } from './dashboard/auth/RegisterForm';
import { AuthProvider } from './dashboard/auth/AuthContext';

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<AuthPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/register" element={<RegisterForm />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
