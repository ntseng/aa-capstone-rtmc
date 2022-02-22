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
					<img src="/images/cow.png" alt="logo" />
				</Link>
				<i className="fa-solid fa-user-circle" />
				<i className="fa-solid fa-user-circle" />
				<i className="fa-solid fa-user-circle" />
				<div>Join millions (?) of people getting more organized and productive!</div>
			</div>
			<div id="right-container">
				<span>Already have an account?</span>
				<Link to="/login">Sign in</Link>
				<h1>Sign up for free.</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<ul>
							{errors.map((error, idx) => <li key={idx}>{error}</li>)}
						</ul>
					</div>
					<div>
						<input
							placeholder="Username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<ul>
							{errors.map((error, idx) => <li key={idx}>{error}</li>)}
						</ul>
					</div>
					<div>
						<input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<ul>
							{errors.map((error, idx) => <li key={idx}>{error}</li>)}
						</ul>
					</div>
					<div>
						<input
							placeholder="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<ul>
							{errors.map((error, idx) => <li key={idx}>{error}</li>)}
						</ul>
					</div>
					<button type="submit">Sign Up</button>
				</form>
				<div onClick={e => dispatch(demoLogin()).then(() => history.push("/app/all"))}>Demo Login</div>
				<div>The original site has some text here about agreeing to their Terms of Service and Privacy Policies.</div>
			</div>
		</div>
	);
}

export default SignupPage;
