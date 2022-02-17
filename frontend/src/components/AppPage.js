import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../store/lists";
import AppFooter from "./AppFooter";
import ListDetails from "./ListDetails";
import ListView from "./ListView";
import TaskDetails from "./TaskDetails";
import TaskView from "./TaskView";

export default function AppPage({ user }) {
	const { listId } = useParams();
	const dispatch = useDispatch();
	const list = useSelector(state => state.lists[listId]);

	useEffect(() => {
		dispatch(fetchLists({ ownerId: user.id }));
	}, [dispatch, user.id])

	let task = { listId: 1, title: "test task", done: false, notes: "notes go here" }; //TODO provide selected task
	return (<>
		<ListView />
		<TaskView user={user} listId={listId} />
		<ListDetails listTitle={list?.title ? list.title : "All Tasks"} />
		{/* TODO #53 fix bad list id in url being labeled "All Tasks" */}
		<TaskDetails task={task} />
		<AppFooter />
	</>)
}
