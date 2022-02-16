import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function ListView() {
	const lists = useSelector(state => state.lists);
	return (<>
		{/* TODO #58 create logo */}
		<Link to="/app/all">All Tasks</Link>
		{
			Object.values(lists).map((list, index) => {
				return (<Link to={`/app/${list.id}`} key={index}>
					{list.title}
				</Link>)
			})
		}
	</>)
}
