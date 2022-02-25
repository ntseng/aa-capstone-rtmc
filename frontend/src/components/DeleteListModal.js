import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { trashList } from "../store/lists";
import { hideModal } from "../store/modal";
import "./css/Modal.css";

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

	return (<div id="modal-container">
		<div id="modal-title">Remove list</div>
		<button id="modal-x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div id="modal-instructions">{`Are you sure you wish to remove the list ${list.title}? Tasks on this list will be moved to the your Inbox.`}</div>
		<div>
			<button id="modal-add-button" className="modal-button"
				onClick={deleteList}
			>
				Yes, remove list
			</button>
			<button id="modal-cancel-button" className="modal-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
