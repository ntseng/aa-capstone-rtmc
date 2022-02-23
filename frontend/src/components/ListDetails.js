import { useSelector } from "react-redux"
import AppFooter from "./AppFooter";
import "./css/ListDetails.css";

export default function ListDetails({ listTitle }) {
	const tasks = useSelector(state => state.tasks);
	let taskCount = 0;
	let overdueCount = 0;
	let doneCount = 0;
	for (const id in tasks) {
		const task = tasks[id];
		if (task.done) {
			doneCount++;
		} else {
			taskCount++;
		}
		if (task.dueDate) {
			const dueDate = new Date(task.dueDate);
			const now = new Date();
			if (now.getUTCFullYear() > dueDate.getUTCFullYear() || now.getUTCMonth() > dueDate.getUTCMonth() || now.getUTCDate() > dueDate.getUTCDate()) {
				overdueCount++;
			}
		}
	}
	return (<div id="list-details-container">
		<div id="list-title-div">{listTitle}</div>
		<div id="list-counters-div">
			<span className="task-counter-container">
				<div className="task-counter-number" id="task-count">{taskCount}</div>
				<div className="task-counter-label">{`task${taskCount === 1 ? "" : "s"}`}</div>
			</span>
			{overdueCount > 0 ? (<span className="task-counter-container">
				<div className="task-counter-number red">{overdueCount}</div>
				<div className="task-counter-label">overdue</div>
			</span>) : (<></>)}
			<span className="task-counter-container">
				<div className="task-counter-number" id="done-count">{doneCount}</div>
				<div className="task-counter-label" id="done-count">completed</div>
			</span>
		</div>
		<AppFooter />
	</div>)
}
