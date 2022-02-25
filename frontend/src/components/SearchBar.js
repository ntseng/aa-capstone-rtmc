import ProfileButton from "./ProfileButton";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSearchedTasks } from "../store/tasks";
import "./css/SearchBar.css";

export default function SearchBar({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();

	function search(e) {
		dispatch(fetchSearchedTasks({ ownerId: user.id, searchTerm: e.target.value }));
		history.push("/app/search");
	}

	return (<div id="search-nav">
		<div id="search-div">
			<i className="fa-solid fa-magnifying-glass" />
			<input id="search-input"
				type="search"
				onKeyDown={e => {
					if (e.key === "Enter" && e.target.value.trim().length) {
						search(e);
					}
				}}
				onBlur={e => {
					if (e.target.value.trim().length) {
						search(e);
					}
				}}
			/>
		</div>
		<div id="search-nav-actions">
			<ProfileButton user={user} />
		</div>
	</div>)
}
