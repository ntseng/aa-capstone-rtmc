import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { signup, demoLogin } from "../store/session";
import './css/AuthPages.css';

function SignupPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/app/all" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(signup({ email, username, password })).then(() => {
				history.push("/app/all");
			}).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors(['Confirm Password field must be the same as the Password field']);
	};

	return (
		<div id="auth-container">
			<div id="left-container">
				<Link to="/">
					<img id="home-link" src="/images/cow.png" alt="logo" />
				</Link>
				<div>
					<img className="signup-person" src="/images/turtle.png" alt="turtle" />
					<img className="signup-person" src="/images/unicorn.png" alt="unicorn" />
					<img className="signup-person" src="/images/paper-frog.png" alt="paper-plane" />
				</div>
				<h2 id="signup-h2">Join millions (?) of people getting more organized and productive!</h2>
			</div>
			<div id="right-container">
				<div id="form-container">
					<div id="swap-div">
						<span id="swap-text">Already have an account?</span>
						<Link id="swap-button" to="/login">Log in</Link>
					</div>
					<form id="auth-form" onSubmit={handleSubmit}>
						<h3 id="auth-h3">Sign up for free.</h3>
						<div>
							<input className={errors.filter(error => error.includes("email") && !error.includes("Username")).length ? "auth-input errored-input" : "auth-input"}
								placeholder="Email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors.filter(error => error.includes("email") && !error.includes("Username")).map((error, idx) => <div key={idx} className="error-message">{error}</div>)}
						</div>
						<div>
							<input className={errors.filter(error => error.includes("username") || error.includes("Username")).length ? "auth-input errored-input" : "auth-input"}
								placeholder="Username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							{errors.filter(error => error.includes("username") || error.includes("Username")).map((error, idx) => <div key={idx} className="error-message">{error}</div>)}
						</div>
						<div>
							<input className={errors.filter(error => error.includes("Password")).length ? "auth-input errored-input" : "auth-input"}
								placeholder="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errors.filter(error => error.includes("Password")).map((error, idx) => <div key={idx} className="error-message">{error}</div>)}
						</div>
						<div>
							<input className={errors.filter(error => error.includes("Confirm")).length ? "auth-input errored-input" : "auth-input"}
								placeholder="Confirm Password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{errors.filter(error => error.includes("Confirm")).map((error, idx) => <div key={idx} className="error-message">{error}</div>)}
						</div>
						<button className="signup-button" type="submit">Sign up!</button>
						<hr />
						<button className="signup-button" onClick={e => { e.preventDefault(); dispatch(demoLogin()).then(() => history.push("/app/all")) }}>Demo Login</button>
					</form>
					<div id="tos-text">The original site has some text here about agreeing to their Terms of Service and Privacy Policies.</div>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;
