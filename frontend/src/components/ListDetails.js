import { useSelector } from "react-redux"

export default function ListDetails({ listTitle }) {
	const tasks = useSelector(state => state.tasks);
	let taskCount = 0;
	let doneCount = 0;
	for (const id in tasks) {
		if (tasks[id].done) {
			doneCount++;
		} else {
			taskCount++;
		}
	}
	return (<>
		<div>{listTitle}</div>
		<span>
			<div>{taskCount}</div>
			{`task${taskCount === 1 ? "" : "s"}`}
		</span>
		{/* TODO #67 add overdue counter */}
		<span>
			<div>{doneCount}</div>
			completed
		</span>
	</>)
}
