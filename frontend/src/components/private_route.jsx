import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	useEffect(() => {
		console.log('Process Route Called');
		const userData = JSON.parse(localStorage.getItem('userDetails'));
		console.log(userData);
		const token = userData ? userData.access_token : null;
		console.log(token);
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	if (isAuthenticated === null) {
		return <></>;
	}

	return !isAuthenticated ? <Navigate to="/" /> : <Component {...rest} />;
};

export default PrivateRoute;
