import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { trashList } from "../store/lists";

export default function ListView({ inboxId, ownerId }) {
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);
	return (<>
		{/* TODO #58 create logo */}
		<Link to="/app/all">All Tasks</Link>
		{
			Object.values(lists).map((list, index) => {
				return (<div key={index}>
					<Link to={`/app/${list.id}`}>
						{list.title}
					</Link>
					{inboxId === list.id ? (<></>) : (<button onClick={e => dispatch(trashList({ listId: list.id, ownerId, inboxId }))}>Delete</button>)}
				</div>)
			})
		}
	</>)
}
