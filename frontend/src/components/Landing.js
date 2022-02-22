import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AppFooter from "./AppFooter";
import "./css/Landing.css";

export default function Landing() {
	const sessionUser = useSelector(state => state.session.user);

	if (sessionUser) return <Redirect to="/app/all" />;
	return (<>
		<ul id="landing-nav-ul">
			<div id="nav-container">
				<li className="landing-nav-item">
					<Link to="/"><img id="nav-logo" src="/images/cow.png" alt="logo" /></Link>
				</li>
				<div id="nav-actions-container">
					<li className="landing-nav-item">
						<a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.rememberthemilk.com/">Original Site</a>
					</li>
					<li className="landing-nav-item">
						<a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nathaniel-tseng-14404838/">Developer</a>
					</li>
					<li className="landing-nav-item">
						<a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone">Repository</a>
					</li>
					<li className="landing-nav-item">
						<Link className="nav-link" to="/login">Login</Link>
					</li>
					<li className="landing-nav-item">
						<Link id="sign-up-button" to="/signup">Sign up for free</Link>
					</li>
				</div>
			</div>
		</ul>
		<header>
			<h1 id="landing-h1">The smart to-do app for busy people.</h1>
			<Link id="call-to-action-button" to="/signup">Sign Up Free</Link>
			<img id="landing-logo" src="/images/cow.svg" alt="logo" />
		</header>
		<footer>
			<div>
				<ul>
					<li>link</li>
					<li>link</li>
					<li>link</li>
				</ul>
				<ul>
					<li>link</li>
					<li>link</li>
					<li>link</li>
				</ul>
				<ul>
					<li>link</li>
					<li>link</li>
					<li>link</li>
				</ul>
				<ul>
					<li>link</li>
					<li>link</li>
					<li>link</li>
				</ul>
			</div>
			<AppFooter />
		</footer>
	</>)
}
