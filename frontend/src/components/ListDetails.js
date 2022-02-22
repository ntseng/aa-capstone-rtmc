import { useSelector } from "react-redux"
import AppFooter from "./AppFooter";
import "./css/ListDetails.css";

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
	return (<div id="list-details-container">
		<div id="list-title-div">{listTitle}</div>
		<div id="list-counters-div">
			<span className="task-counter-container">
				<div className="task-counter-number" id="task-count">{taskCount}</div>
				<div className="task-counter-label">{`task${taskCount === 1 ? "" : "s"}`}</div>
			</span>
			{/* TODO #67 add overdue counter */}
			<span className="task-counter-container">
				<div className="task-counter-number" id="done-count">{doneCount}</div>
				<div className="task-counter-label" id="done-count">completed</div>
			</span>
		</div>
		<AppFooter />
	</div>)
}
