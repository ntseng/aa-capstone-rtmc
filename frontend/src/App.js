import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import { restoreUser } from './store/session';
import Navigation from './components/Navigation';
import AppPage from './components/AppPage';
// import { Modal } from './components/Modal';
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	//   const [showModal, setShowModal] = useState(false);
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{/* <button onClick={() => setShowModal(true)}>Modal</button> */}
			{/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
			{isLoaded && (
				<Switch>
					<Route path="/login" >
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignupFormPage />
					</Route>
					<Route path="/app">
						{(user) ? <AppPage /> : <Redirect to='/login' />}
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
