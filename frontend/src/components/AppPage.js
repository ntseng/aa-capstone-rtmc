import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../store/lists";
import ListDetails from "./ListDetails";
import ListView from "./ListView";
import TaskDetails from "./TaskDetails";
import TaskView from "./TaskView";

export default function AppPage({ user }) {
	const { listId } = useParams();
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);

	useEffect(() => {
		dispatch(fetchLists({ ownerId: user.id }));
	}, [dispatch, user.id])

	return (<>
		<ListView inboxId={user?.inboxId} ownerId={user.id} />
		<TaskView user={user} listId={listId} />
		<ListDetails listTitle={lists[listId]?.title ? lists[listId].title : "All Tasks"} />
		{/* TODO #53 fix bad list id in url being labeled "All Tasks" */}
		<TaskDetails lists={lists} />
	</>)
}
