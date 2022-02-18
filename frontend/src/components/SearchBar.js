import ProfileButton from "./ProfileButton";
import "./css/SearchBar.css";

export default function SearchBar({ user }) {
	return (<div id="navbar">
		<div id="search-div">
			<input id="search-input" type="text"></input>
		</div>
		<div id="navbar-profile">
			<ProfileButton user={user} />
		</div>
	</div>)
}
