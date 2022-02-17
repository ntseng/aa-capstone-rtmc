import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTask } from "../store/tasks";

export default function TaskDetails({ taskId, lists }) {
	const dispatch = useDispatch();
	const task = useSelector(state => state.tasks[taskId]);
	const [notesBackup, setNotesBackup] = useState("");
	const [notes, setNotes] = useState(task?.notes || "");

	return (<div>
		<input type="text"
			defaultValue={task?.title}
			onBlur={e => dispatch(editTask({ task, title: e.target.value }))}
		/>
		<div>due</div>
		<input type="datetime-local"
			defaultValue={task?.dueDate?.slice(0, task.dueDate.length - 2)} // dueDates come back from database with an extra Z on the end
			onBlur={e => dispatch(editTask({ task, dueDate: e.target.value }))}
		/>
		<button
			disabled={!task?.dueDate}
			onClick={e => dispatch(editTask({ task, dueDate: null }))}
		>Delete Due Date</button>
		<div>list</div>
		<select
			onBlur={e => dispatch(editTask({ task, listId: e.target.value }))}
		>
			{Object.values(lists).map((list, index) => {
				return (
					<option key={index} value={list.id}>{list.title}</option>
				)
			})}
		</select>
		<h3>Notes</h3>
		{task?.notes ?
			(<div>
				<div>{task.notes}</div>
				<span onClick={e => {
					setNotes(task.notes);
					setNotesBackup(task.notes);
					dispatch(editTask({ task, notes: "" }));
				}}>Edit</span>
				<span onClick={e => dispatch(editTask({ task, notes: "" }))}>Delete</span>
			</div>)
			:
			(<div>
				<input type="text"
					placeholder="Add a note..."
					value={notes}
					onChange={e => setNotes(e.target.value)}
				/>
				<button
					disabled={!notes}
					onClick={e => {
						dispatch(editTask({ task, notes }));
						setNotes("");
					}}
				>Add Note</button>
				<button
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
