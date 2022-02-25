import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { fetchLists } from "../store/lists";
import ListDetails from "./ListDetails";
import ListView from "./ListView";
import SearchBar from "./SearchBar";
import TaskDetails from "./TaskDetails";
import TaskView from "./TaskView";
import "./css/AppPage.css";

export default function AppPage({ user }) {
	const { listId } = useParams();
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);

	useEffect(() => {
		dispatch(fetchLists({ ownerId: user.id }));
	}, [dispatch, user.id])

	useEffect(() => {
		document.title = `${lists[listId]?.title ? lists[listId].title : "All Tasks"} - RtMC`;
	}, [lists, listId])

	if (!(lists[listId] || ["all", "search"].includes(listId))) {
		return (<Redirect to={`/app/${user.inboxId}`} />)
	}

	return (<>
		<SearchBar user={user} />
		<div id="app-container">
			<ListView inboxId={user.inboxId} ownerId={user.id} />
			<TaskView user={user} listId={listId} />
			<ListDetails listTitle={lists[listId]?.title ? lists[listId].title : "All Tasks"} />
			<TaskDetails lists={lists} avatarURL={user.avatarURL} />
		</div>
	</>)
}
