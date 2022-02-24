import React, { useState } from "react";
import { login, demoLogin } from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import './css/AuthPages.css';

function LoginPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/app/all" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(login({ credential, password })).then(() => {
			history.push("/app/all");
		}).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<div id="auth-container">
			<div id="left-container">
				<Link to="/">
					<img id="home-link" src="/images/cow.png" alt="logo" />
				</Link>
				<div id="quote-text">
					“Any day that ends with something existing that didn't when the day began is a good day in my book.”
				</div>
				<div id="quote-attribution">
					- Sean Bonner
				</div>
				<div id="quote-tip-container">
					<img className="quote-circle" src="/images/paper-plane.png" alt="Bot T. Monkey" />
					<span id="quote-tip">
						Quote curated from the collection of Bob T. Monkey, renowned productivity expert
					</span>
				</div>
			</div>
			<div id="right-container">
				<div id="form-container">
					<div id="swap-div">
						<span id="swap-text">Don't have an account?</span>
						<Link id="swap-button" to="/signup">Sign up for free</Link>
					</div>
					<form id="auth-form" onSubmit={handleSubmit}>
						<h3 id="auth-h3">Been here before? Welcome back!</h3>
						<div>
							<input className={`auth-input ${errors.filter(error => error.includes("email")).length ? "errored-input" : ""}`}
								placeholder="Username or Email"
								type="text"
								value={credential}
								onChange={(e) => setCredential(e.target.value)}
							/>
							{errors.filter(error => error.includes("email")).map((error, idx) => (
								<div key={idx} className="error-message">{error}</div>
							))}
						</div>
						<div>
							<input className={`auth-input ${errors.filter(error => error.includes("password")).length ? "errored-input" : ""}`}
								placeholder="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errors.filter(error => error.includes("password")).map((error, idx) => (
								<div key={idx} className="error-message">{error}</div>
							))}
						</div>
						<button className="signup-button" type="submit">Log In</button>
						<hr />
						<button className="signup-button" onClick={e => { e.preventDefault(); dispatch(demoLogin()).then(() => history.push("/app/all")) }}>Demo Login</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
