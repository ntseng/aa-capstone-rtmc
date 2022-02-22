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
					<img src="/images/cow.png" alt="logo" />
				</Link>
				<div>
					“Any day that ends with something existing that didn't when the day began is a good day in my book.”
				</div>
				<div>
					- Sean Bonner
				</div>
				<i className="fa-solid fa-user-circle" />
				<div>
					Quote curated from the collection of Bob T. Monkey, renowned productivity expert
				</div>
			</div>
			<div id="right-container">
				<span>Don't have an account?</span>
				<Link to="/signup">Sign up for free</Link>
				<h1>Been here before? Welcome back!</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							className={errors.filter(error => error.includes("email")).length ? "errored-input" : ""}
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
						<input
							className={errors.filter(error => error.includes("password")).length ? "errored-input" : ""}
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors.filter(error => error.includes("password")).map((error, idx) => (
							<div key={idx} className="error-message">{error}</div>
						))}
					</div>
					<button type="submit">Log In</button>
				</form>
				<button onClick={e => dispatch(demoLogin()).then(() => history.push("/app/all"))}>Demo Login</button>
			</div>
		</div>
	);
}

export default LoginPage;
