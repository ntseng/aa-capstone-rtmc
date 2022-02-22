import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../store/selectedTask";
import { fetchAllTasks, createTask, trashTask, editTask, fetchTasksFromList } from "../store/tasks";
import "./css/TaskView.css";

export default function TaskView({ user, listId }) {
	const dispatch = useDispatch();
	const tasks = useSelector(state => state.tasks);
	const selectedTaskId = useSelector(state => state.selectedTaskId);
	const [showCompleted, setShowCompleted] = useState(false);
	const [newTaskText, setNewTaskText] = useState("");

	useEffect(() => {
		if (isNaN(parseInt(listId))) {
			dispatch(fetchAllTasks({ ownerId: user.id }));
		} else {
			dispatch(fetchTasksFromList({ ownerId: user.id, listId }));
		}
	}, [dispatch, user.id, listId])

	function toggleComplete() {
		dispatch(editTask({
			task: tasks[selectedTaskId],
			done: !showCompleted
		}))
	}

	function removeTask() {
		dispatch(trashTask(selectedTaskId));
	}

	function submitTask() {
		dispatch(createTask({
			ownerId: user.id,
			listId: 1,
			title: newTaskText
		}))
		setNewTaskText("");
	}

	return (
		<div id="task-view-container"
			onClick={e => {
				dispatch(selectTask(null))
			}}
		>
			<div id="completion-sort-container">
				<span className="completion-link" onClick={e => setShowCompleted(false)}>Incomplete</span>
				<span className="completion-link" onClick={e => setShowCompleted(true)}>Completed</span>
			</div>
			<div id="task-action-container">
				<button className="task-action-button"
					disabled={selectedTaskId === null}
					onClick={toggleComplete}
				>
					{showCompleted ? (<i className="fa-solid fa-rotate-left" />) : (<i className="fa-solid fa-check" />)}
				</button>
				<button className="task-action-button"
					disabled={selectedTaskId === null}
					onClick={removeTask}
				>
					<i className="fa-solid fa-trash-can" />
				</button>
			</div>
			<div id="task-creation-container">
				<input type="text"
					id="task-creation-input"
					placeholder="Add a task..."
					value={newTaskText}
					onChange={e => setNewTaskText(e.target.value)}
				/>
				<div>
					<button id="add-task-button"
						hidden={!newTaskText}
						onClick={submitTask}
					>Add Task</button>
				</div>
			</div>
			<div id="task-container">
				{
					Object.values(tasks).filter(task => task.done === showCompleted).map((task, index) => {
						return (
							<div className="task-container" key={index}>
								<span>
									<input type="checkbox"
										checked={selectedTaskId === task.id}
										onChange={e => dispatch(selectTask(e.target.checked ? task.id : null))}
									/>
									<span className="task-summary">
										{task.title}
									</span>
								</span>
								{task.dueDate ? (<span>{new Date(task.dueDate).toDateString()}</span>) : (<></>)}
							</div>
						);
					})
				}
			</div>
		</div>
	)
}
