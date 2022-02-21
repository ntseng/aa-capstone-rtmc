import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { trashList } from "../store/lists";
import { Modal } from './Modal';
import NewListModal from "./NewListModal";
import "./css/ListView.css";
import { hideModal, showModal } from "../store/modal";

export default function ListView({ inboxId, ownerId }) {
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);
	const modal = useSelector(state => state.modal);
	return (<div id="list-view-container">
		{/* TODO #58 create logo */}
		<ul>
			<div className="list-view-item">
				<div className="list-link">Lists</div>
				<button className="list-button" onClick={e => dispatch(showModal("newList"))}>
					<i className="fa-solid fa-plus" />
				</button>
			</div>
			<div className="list-view-item">
				<NavLink className="list-link" to={`/app/${inboxId}`}>Inbox</NavLink>
			</div>
			<div className="list-view-item">
				<NavLink className="list-link" to="/app/all">All Tasks</NavLink>
			</div>
			{
				Object.values(lists).map((list, index) => {
					return (<div className="list-view-item" key={index}>
						{inboxId === list.id ? (<></>) : (<>
							<NavLink className="list-link" to={`/app/${list.id}`}>
								{list.title}
							</NavLink>
							<div className="list-actions-container">
								{/* TODO #88 rename list button functionality */}
								<button className="list-button">
									<i className="fa-solid fa-pencil" />
								</button>
								<button className="list-button" onClick={e => dispatch(trashList({ listId: list.id, ownerId, inboxId }))}>
									<i className="fa-solid fa-trash-can" />
								</button>
							</div>
						</>
						)}
					</div>)
				})
			}
		</ul>
		{modal === "newList" && (
			<Modal onClose={() => dispatch(hideModal())}>
				<NewListModal ownerId={ownerId} />
			</Modal>
		)}
	</div>)
}
