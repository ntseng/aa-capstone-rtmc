export default function TaskDetails({ task }) {
	return (<div>
		<input type="text"
			value={task.title}
		/>
		<div>due</div>
		<input type="date" />
		<div>list</div>
		<input type="select" />
		<h3>Notes</h3>
		<input type="text"
			value={task.notes}
		/>
	</div>)
}
