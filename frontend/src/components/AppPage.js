import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../store/lists";
import ListDetails from "./ListDetails";
import TaskView from "./TaskView";

export default function AppPage({ user }) {
	const { listId } = useParams();
	const dispatch = useDispatch();
	const list = useSelector(state => state.lists[listId]);

	useEffect(() => {
		dispatch(fetchLists({ ownerId: user.id }));
	}, [dispatch, user.id])

	return (<>
		<TaskView user={user} listId={listId} />
		<ListDetails listTitle={list?.title ? list.title : "All Tasks"} />
		{/* TODO #52 check if entering url can be used to view other users' lists */}
		{/* TODO #53 fix bad list id in url being labeled "All Tasks" */}
	</>)
}
