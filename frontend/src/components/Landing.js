import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AppFooter from "./AppFooter";
import "./css/Landing.css";

export default function Landing() {
	const sessionUser = useSelector(state => state.session.user);

	if (sessionUser) return <Redirect to="/app/all" />;
	return (<>
		<ul id="landing-nav-ul">
			<li>
				<Link to="/"><img id="nav-logo" src="/images/cow.png" alt="logo" /></Link>
			</li>
			<li className="landing-nav-item">
				<Link to="/login">Login</Link>
			</li>
			<li className="landing-nav-item">
				<Link to="/login">Login</Link>
			</li>
			<li className="landing-nav-item">
				<Link to="/login">Login</Link>
			</li>
			<li className="landing-nav-item">
				<Link to="/signup">Sign up for free</Link>
			</li>
		</ul>
		<header>
			<div>
				<h1>The smart to-do app for busy people</h1>
				<Link to="/signup">Sign Up Free</Link>
			</div>
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
