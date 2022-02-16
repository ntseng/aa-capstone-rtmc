import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks, createTask } from "../store/tasks";

export default function TaskView() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const tasks = useSelector(state => state.tasks);
	const [showCompleted, setShowCompleted] = useState(false);
	const [newTaskText, setNewTaskText] = useState("");
	const [selectedTaskId, setSelectedTaskId] = useState(null);

	useEffect(() => {
		dispatch(fetchAllTasks({ ownerId: sessionUser.id }));
	}, [dispatch, sessionUser.id])

	function submitTask() {
		dispatch(createTask({
			ownerId: sessionUser.id,
			listId: 1,
			title: newTaskText
		}))
		setNewTaskText("");
	}

	return (
		<div id="task-view-container"
			onClick={e => setSelectedTaskId(null)}
		>
			<div id="completion-sort-container">
				<span onClick={e => setShowCompleted(false)}>Incomplete</span>
				<span onClick={e => setShowCompleted(true)}>Complete</span>
			</div>
			<div id="task-action-container">
				<button>Complete</button>
				<button>Delete</button>
			</div>
			<div id="task-creation-container">
				<input type="text"
					placeholder="Add a task..."
					value={newTaskText}
					onChange={e => setNewTaskText(e.target.value)}
				/>
				<button onClick={submitTask}>Add Task</button>
			</div>
			<div id="task-container">
				{
					Object.values(tasks).filter(task => task.done === showCompleted).map((task, index) => {
						return (
							<div key={index}
								onChange={e => setSelectedTaskId(task.id)}
							>
								<input type="checkbox"
									checked={selectedTaskId === task.id}
								/>
								{task.title}
							</div>
						);
					})
				}
			</div>
		</div>
	)
}
