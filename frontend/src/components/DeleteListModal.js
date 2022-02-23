import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { trashList } from "../store/lists";
import { hideModal } from "../store/modal";
import "./css/ListModals.css";

export default function DeleteListModal({ ownerId, listId, inboxId }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const list = useSelector(state => state.lists[listId]);

	function deleteList(e) {
		dispatch(trashList({ listId, ownerId, inboxId }));
		dispatch(hideModal());
		history.push("/app/all");
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (<div id="new-list-container">
		<div id="new-list-title">Remove list</div>
		<button id="x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div id="list-modal-instructions">{`Are you sure you wish to remove the list ${list.title}? Tasks on this list will be moved to the your Inbox.`}</div>
		<div>
			<button id="new-list-add-button"
				onClick={deleteList}
			>
				Yes, remove list
			</button>
			<button id="new-list-cancel-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
