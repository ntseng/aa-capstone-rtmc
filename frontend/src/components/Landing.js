import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
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
			<img id="landing-img" src="/images/paul-hanaoka-4ZaH0DGGomI-unsplash.jpg" alt="logo" />
		</header>
		<footer>
			<div>
				<div id="footer-container">
					<img id="landing-logo" src="/images/cow.svg" alt="logo" />
					<ul>
						<div className="category-heading">Developer</div>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nathaniel-tseng-14404838/">LinkedIn</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng">GitHub</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1oUYEFjFufv3GhipZB3FYK4PMajOvvq6wDjri6ycO6PM/edit#gid=122240886">Scorecard</a></li>
					</ul>
					<ul>
						<div className="category-heading">Product</div>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone">Repository</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/DB-Schema">DB Schema</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/Wireframes">Wireframes</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/Technology-List">Technology List</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/User-Stories">User Stories</a></li>
					</ul>
					<ul>
						<div className="category-heading">Credits</div>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://www.rememberthemilk.com/">Original Site</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://game-icons.net/1x1/delapouite/cow.html">Logo/Favicon Credit</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://unsplash.com/@plhnk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Landing Photo</a></li>
					</ul>
					<ul>
						<div className="category-heading">Previous Projects</div>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://aa-group-project-teachables.herokuapp.com/">Teachables</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://aa-soloproject-evernote-clone.herokuapp.com/">Evernote Clone</a></li>
						<li className="footer-li"><a className="footer-a" target="_blank" rel="noopener noreferrer" href="https://extension-hunt.herokuapp.com/">Extension Hunt</a></li>
					</ul>
				</div>
				<div id="landing-copyright">○ 2022 Remember the Milk Clone</div>
			</div>
		</footer>
	</>)
}
