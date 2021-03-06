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
		if (listId === "all") {
			dispatch(fetchAllTasks({ ownerId: user.id }));
		} else if (!isNaN(parseInt(listId))) {
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
			listId: ["all", "search"].includes(listId) ? user.inboxId : listId,
			title: newTaskText
		}))
		setNewTaskText("");
	}

	return (
		<div id="task-view-container">
			<div id="completion-sort-container">
				<span className={`completion-link ${showCompleted ? "tab-inactive" : "tab-active"}`} onClick={e => setShowCompleted(false)}>Incomplete</span>
				<span className={`completion-link ${!showCompleted ? "tab-inactive" : "tab-active"}`} onClick={e => setShowCompleted(true)}>Completed</span>
			</div>
			<div id="task-action-container">
				<button title={showCompleted ? "Mark Task Incomplete" : "Mark Task Complete"}
					className="task-action-button"
					disabled={selectedTaskId === null}
					onClick={toggleComplete}
				>
					{showCompleted ? (<i className="fa-solid fa-rotate-left" />) : (<i className="fa-solid fa-check" />)}
				</button>
				<button title="Delete Task"
					className="task-action-button"
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
					onKeyDown={e => {
						if (e.key === "Enter" && newTaskText.trim().length && newTaskText.trim().length < 51) {
							submitTask();
						}
					}}
				/>
				<div>
					<button id="add-task-button"
						hidden={!newTaskText.trim().length}
						disabled={newTaskText.trim().length > 50}
						onClick={submitTask}
					>{newTaskText.trim().length < 51 ? "Add Task" : "Title too long"}</button>
				</div>
			</div>
			<div id="task-container">
				{
					Object.values(tasks).filter(task => task.done === showCompleted).map((task, index) => {
						if (task.listId.toString() === listId || ["all", "search"].includes(listId)) {
							const dueDate = new Date(task.dueDate);
							const dueTimestamp = Math.floor(dueDate.getTime() / 86400000); // 86400000 ms per day
							const now = Math.floor(Date.now() / 86400000);
							return (
								<div className="task-container" key={index}
									onClick={e => dispatch(selectTask(selectedTaskId !== task.id ? task.id : null))}
								>
									<span>
										<input type="radio"
											checked={selectedTaskId === task.id}
											readOnly
										/>
										<span className="task-summary">
											{task.title}
										</span>
									</span>
									{task.dueDate ? (<span className={
										!task.done && now > dueTimestamp ?
											"red" :
											task.done || now < dueTimestamp ?
												"" :
												"blue"}>{new Date(dueDate.setMinutes(dueDate.getMinutes() + dueDate.getTimezoneOffset())).toDateString()}</span>) : (<></>)}
								</div>
							);
						} else {
							return (<div key={index}></div>);
						}
					})
				}
			</div>
		</div>
	)
}
