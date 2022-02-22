import "./css/AppFooter.css";

export default function AppFooter() {
	return (<div id="app-footer-container">
		<ul id="app-footer-ul">
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nathaniel-tseng-14404838/">Developer</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone">Repository</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/DB-Schema">DB Schema</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/Wireframes">Wireframes</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/Technology-List">Technology List</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://github.com/ntseng/aa-capstone/wiki/User-Stories">User Stories</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://game-icons.net/1x1/delapouite/cow.html">Logo/Favicon Credit</a>
			</li>
			<li className="app-footer-li">
				<a className="app-footer-a" target="_blank" rel="noopener noreferrer" href="https://www.rememberthemilk.com/">Original Site</a>
			</li>
		</ul>
		<div id="app-footer-copyright">○ 2022 Remember the Milk Clone</div>
	</div>)
}
