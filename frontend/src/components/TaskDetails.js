import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTask } from "../store/selectedTask";
import { editTask } from "../store/tasks";
import "./css/TaskDetails.css";

export default function TaskDetails({ lists }) {
	const dispatch = useDispatch();
	const task = useSelector(state => state.tasks[state.selectedTaskId]);
	const [notesBackup, setNotesBackup] = useState("");
	const [notes, setNotes] = useState(task?.notes || "");

	return (<div id="task-details-container" className={task ? "slide" : "not-slide"}>
		<button id="close-task-details" onClick={e => dispatch(selectTask(null))}>close x</button>
		<input id="task-title"
			type="text"
			defaultValue={task?.title}
			onBlur={e => dispatch(editTask({ task, title: e.target.value }))}
		/>
		<div id="due-label">due</div>
		<input id="due-input"
			type="datetime-local"
			defaultValue={task?.dueDate?.slice(0, task.dueDate.length - 2)} // dueDates come back from database with an extra Z on the end
			onBlur={e => dispatch(editTask({ task, dueDate: e.target.value }))}
		/>
		<button id="trash-due-date-button"
			hidden={!task?.dueDate}
			onClick={e => dispatch(editTask({ task, dueDate: null }))}
		>
			<i className="fa-solid fa-trash-can" />
		</button>
		<div id="list-label">list</div>
		<select id="list-select"
			onBlur={e => dispatch(editTask({ task, listId: e.target.value }))}
		>
			{Object.values(lists).map((list, index) => {
				return (
					<option key={index} value={list.id}>{list.title}</option>
				)
			})}
		</select>
		<div id="notes-label">Notes</div>
		{task?.notes ?
			(<div>
				<div>{task.notes}</div>
				<span onClick={e => {
					setNotes(task.notes);
					setNotesBackup(task.notes);
					dispatch(editTask({ task, notes: "" }));
				}}>Edit</span>
				{/* TODO #93 style notes edit/delete elements */}
				<span onClick={e => dispatch(editTask({ task, notes: "" }))}>Delete</span>
			</div>)
			:
			(<div>
				<input id="notes-input"
					type="text"
					placeholder="Add a note..."
					value={notes}
					onChange={e => setNotes(e.target.value)}
				/>
				<button id="notes-save-button"
					disabled={!notes}
					onClick={e => {
						dispatch(editTask({ task, notes }));
						setNotes("");
					}}
				>Save</button>
				<button id="notes-cancel-button"
					disabled={!notes}
					onClick={e => {
						dispatch(editTask({ task, notes: notesBackup }));
						setNotes("");
					}}
				>Cancel</button>
			</div>)
		}
	</div >)
}
