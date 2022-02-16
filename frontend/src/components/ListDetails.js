import { useSelector } from "react-redux"

export default function ListDetails({ list }) {
	const tasks = useSelector(state => state.tasks);

	return (<>
		<div>{list.title}</div>
		<span>
			<div>{Object.values(tasks).reduce((count, task) => task.done ? count : count + 1, 0)}</div>
			{`task`}
		</span>
		<span>
			<div>{Object.values(tasks).reduce((count, task) => task.done ? count + 1 : count, 0)}</div>
			{`completed`}
		</span>
	</>)
}
