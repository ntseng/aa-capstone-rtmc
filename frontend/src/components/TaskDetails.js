import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectTask } from "../store/selectedTask";
import { editTask } from "../store/tasks";
import "./css/TaskDetails.css";

export default function TaskDetails({ lists }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const task = useSelector(state => state.tasks[state.selectedTaskId]);
	const [notesBackup, setNotesBackup] = useState("");
	const [notes, setNotes] = useState(task?.notes || "");

	return (<div id="task-details-container" className={task ? "slide" : "not-slide"}>
		<button id="close-task-details" onClick={e => dispatch(selectTask(null))}>close x</button>
		<input id="task-title"
			type="text"
			defaultValue={task?.title}
			onBlur={e => dispatch(editTask({ task, title: e.target.value }))} //TODONOW max length validation
		/>
		<div id="due-label">due</div>
		<input id="due-input"
			type="date"
			defaultValue={new RegExp(/(\d+-\d+-\d+)/).exec(task?.dueDate)?.[1]}
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
			onChange={e => { history.push(`/app/${e.target.value}`); dispatch(editTask({ task, listId: e.target.value })) }}
			value={task ? task.listId : 0}
		>
			{Object.values(lists).map((list, index) => {
				return (
					<option key={index} value={list.id} >{list.title}</option>
				)
			})}
		</select>
		<div id="notes-label">Notes</div>
		{task?.notes ?
			(<div>
				<div className="notes-div">{task.notes}</div>
				<span>{new Date(task.updatedAt).toDateString()}</span>
				<span> • </span>
				<span className="notes-link" onClick={e => {
					setNotes(task.notes);
					setNotesBackup(task.notes);
					dispatch(editTask({ task, notes: "" }));
				}}>Edit</span>
				<span> • </span>
				<span className="notes-link" onClick={e => dispatch(editTask({ task, notes: "" }))}>Delete</span>
			</div>)
			:
			(<div>
				<input id="notes-input"
					type="text"
					placeholder="Add a note..."
					value={notes}
					onChange={e => setNotes(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter" && notes.trim().length && notes.trim().length < 51) {
							dispatch(editTask({ task, notes }));
							setNotes("");
						}
					}}
				/>
				<button id="notes-save-button"
					hidden={!notes.trim().length}
					disabled={notes.trim().length > 50}
					onClick={e => {
						dispatch(editTask({ task, notes }));
						setNotes("");
					}}
				>{notes.trim().length < 51 ? "Save" : "Message too long"}</button>
				<button id="notes-cancel-button"
					hidden={!notes}
					onClick={e => {
						dispatch(editTask({ task, notes: notesBackup }));
						setNotes("");
					}}
				>Cancel</button>
			</div>)
		}
	</div >)
}
