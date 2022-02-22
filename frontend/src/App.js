import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import { restoreUser } from './store/session';
import AppPage from './components/AppPage';
import Landing from './components/Landing';
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false); //TODO #121 use isLoaded to reduce use of optional chaining
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route path="/login" >
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignupFormPage />
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
