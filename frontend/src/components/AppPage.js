import ListDetails from "./ListDetails";
import TaskView from "./TaskView";

export default function AppPage() {
	const list = { id: 1, title: "All Tasks" }; //TODO #49 fetch list from store

	return (<>
		<TaskView />
		<ListDetails list={list} />
	</>)
}
