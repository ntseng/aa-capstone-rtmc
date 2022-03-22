import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { Modal } from './Modal';
import { hideModal, showModal } from "../store/modal";
import NewListModal from "./NewListModal";
import RenameListModal from "./RenameListModal";
import { selectTask } from "../store/selectedTask";
import DeleteListModal from "./DeleteListModal";
import "./css/ListView.css";

export default function ListView({ inboxId, ownerId }) {
	const dispatch = useDispatch();
	const lists = useSelector(state => state.lists);
	const modal = useSelector(state => state.modal);

	function selectList(e) {
		dispatch(selectTask(null))
		document.querySelector("#search-input").value = "";
	}

	function openModal(modalName) {
		dispatch(showModal(modalName))
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (<div id="list-view-container">
		<img id="logo" src="/images/cow.svg" alt="logo" />
		<div id="lists-label">
			<div className="list-link">Lists</div>
			<button title="Add List"
				className="list-button"
				onClick={e => openModal("newList")}
			>
				<i className="fa-solid fa-plus" />
			</button>
		</div>
		<hr color="#7AB2E0" size="1" />
		<div id="list-container">
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
								<button title="Rename List"
									className="list-button"
									onClick={e => openModal(`renameList/${list.id}`)}
								>
									<i className="fa-solid fa-pencil" />
								</button>
								<button title="Delete List"
									className="list-button"
									onClick={e => openModal(`deleteList/${list.id}`)}
								>
									<i className="fa-solid fa-trash-can" />
								</button>
							</div>
						</>
						)}
					</div>)
				})
			}
		</div>
		{modal === "newList" && (
			<Modal onClose={closeModal}>
				<NewListModal ownerId={ownerId} />
			</Modal>
		)}
		{modal?.startsWith("renameList") && (
			<Modal onClose={closeModal}>
				<RenameListModal listId={modal.split("/")[1]} />
			</Modal>
		)}
		{modal?.startsWith("deleteList") && (
			<Modal onClose={closeModal}>
				<DeleteListModal ownerId={ownerId} listId={modal.split("/")[1]} inboxId={inboxId} />
			</Modal>
		)}
	</div >)
}
