import React, { useState } from "react";
import { login, demoLogin } from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import './css/LoginForm.css';

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => { //TODO #61 after sign-in redirect to /app/all
		e.preventDefault();
		setErrors([]);
		return dispatch(login({ credential, password }))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Username or Email
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Log In</button>
			</form>
			<div onClick={e => dispatch(demoLogin())}>Demo Login</div>
			<span>Don't have an account?</span>
			<Link to="/signup">Create account</Link>
		</>
	);
}

export default LoginFormPage;
