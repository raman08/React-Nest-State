import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Profile from './pages/profile';
import States from './pages/states';
import PrivateRoute from './components/private_route';

function App() {
	return (
		// <div className="App">
		<div>
			<Routes>
				<Route path="/" element={<Home />} exact></Route>
				<Route
					path="/profile"
					element={<PrivateRoute component={Profile}></PrivateRoute>}
					exact
				></Route>
				<Route path="/states" element={<States />} exact></Route>
			</Routes>
		</div>
	);
}

export default App;
