import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { LoginForm } from "./dashboard/forms/LoginForm"
import { Dashboard } from './dashboard/DashboardComponent';
import { AuthPage } from './dashboard/forms/AuthPage';
import { RegisterForm } from './dashboard/forms/RegisterForm';

function App() {
	return (
		<>
			{/* <h1>Welkom bij gymtracker</h1>
      <p>
        Deze applicatie is nog in ontwikkeling. Het doel is om een
        gebruiksvriendelijke interface te bieden voor het bijhouden van je
        fitnessactiviteiten en voortgang.
      </p> */}
			<Router>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/register" element={<RegisterForm />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
