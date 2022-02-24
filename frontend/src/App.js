import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from "./components/LoginPage";
import { restoreUser } from './store/session';
import AppPage from './components/AppPage';
import Landing from './components/Landing';
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route path="/login" >
						<LoginPage />
					</Route>
					<Route path='/signup'>
						<SignupPage />
					</Route>
					<Route path="/app/:listId">
						{(user) ? <AppPage user={user} /> : <Redirect to='/login' />}
					</Route>
					<Route>
						<Landing />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
