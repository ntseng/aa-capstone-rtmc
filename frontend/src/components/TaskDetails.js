import { useSelector, useDispatch } from "react-redux";
import { editTask } from "../store/tasks";

export default function TaskDetails({ taskId }) {
	const dispatch = useDispatch();
	const task = useSelector(state => state.tasks[taskId]);

	return (<div>
		<input type="text"
			defaultValue={task?.title}
			onBlur={e => dispatch(editTask({ task, title: e.target.value }))}
		/>
		<div>due</div>
		<input type="datetime-local"
			defaultValue={task?.dueDate.slice(0, task.dueDate.length - 2)} // dueDates come back from database with an extra Z on the end
			onBlur={e => dispatch(editTask({ task, dueDate: e.target.value }))}
		/>
		<div>list</div>
		<input type="select" />
		<h3>Notes</h3>
		<input type="text"
			defaultValue={task?.notes}
		/>
	</div>)
}
