import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { trashList } from "../store/lists";
import { Modal } from './Modal';
import { hideModal, showModal } from "../store/modal";
import NewListModal from "./NewListModal";
import RenameListModal from "./RenameListModal";
import "./css/ListView.css";
import { selectTask } from "../store/selectedTask";

export default function ListView({ inboxId, ownerId }) {
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);
	const modal = useSelector(state => state.modal);

	function selectList(e) {
		dispatch(selectTask(null))
		document.querySelector("#search-input").value = "";
	}

	return (<div id="list-view-container">
		<img id="logo" src="/images/cow.svg" alt="logo" />
		<div id="lists-label">
			<div className="list-link">Lists</div>
			<button className="list-button"
				onClick={e => dispatch(showModal("newList"))}
			>
				<i className="fa-solid fa-plus" />
			</button>
		</div>
		<hr color="#7AB2E0" size="1" />
		<div className="list-view-item">
			<NavLink className="list-link" to={`/app/${inboxId}`} onClick={selectList}>Inbox</NavLink>
		</div>
		<div className="list-view-item">
			<NavLink className="list-link" to="/app/all" onClick={selectList}>All Tasks</NavLink>
		</div>
		{
			Object.values(lists).map((list, index) => {
				return (<div className="list-view-item" key={index}>
					{inboxId === list.id ? (<></>) : (<>
						<NavLink className="list-link" to={`/app/${list.id}`} onClick={selectList}>
							{list.title}
						</NavLink>
						<div className="list-actions-container">
							<button className="list-button"
								onClick={e => dispatch(showModal(`renameList/${list.id}`))}
							>
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
		{modal === "newList" && (
			<Modal onClose={() => dispatch(hideModal())}>
				<NewListModal ownerId={ownerId} />
			</Modal>
		)}
		{
			modal?.startsWith("renameList") && (
				<Modal onClose={() => dispatch(hideModal())}>
					<RenameListModal listId={modal.split("/")[1]} />
				</Modal>
			)
		}
	</div >)
}
