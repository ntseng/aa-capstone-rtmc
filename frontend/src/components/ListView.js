import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { trashList } from "../store/lists";
import "./css/ListView.css";

export default function ListView({ inboxId, ownerId }) {
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);
	return (<div id="list-view-container">
		{/* TODO #58 create logo */}
		<ul>
			<NavLink className="list-view-item" to="/app/all">All Tasks</NavLink>
			{
				Object.values(lists).map((list, index) => {
					return (<div key={index}>
						<NavLink className="list-view-item" to={`/app/${list.id}`}>
							{list.title}
						</NavLink>
						{inboxId === list.id ? (<></>) : (<button onClick={e => dispatch(trashList({ listId: list.id, ownerId, inboxId }))}>Delete</button>)}
					</div>)
				})
			}
		</ul>
	</div>)
}
