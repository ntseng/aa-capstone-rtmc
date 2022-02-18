import ProfileButton from "./ProfileButton";
import "./css/SearchBar.css";

export default function SearchBar({ user }) {
	return (<div id="search-nav">
		<div id="search-div">
			<i className="fa-solid fa-magnifying-glass" />
			<input id="search-input" type="text" />
		</div>
		<div id="search-nav-actions">
			<ProfileButton user={user} />
		</div>
	</div>)
}
