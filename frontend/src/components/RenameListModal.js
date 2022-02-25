import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { renameList } from "../store/lists";
import { hideModal } from "../store/modal";
import "./css/Modal.css";

export default function RenameListModal({ listId }) {
	const dispatch = useDispatch();
	const list = useSelector(state => state.lists[listId]);
	const [title, setTitle] = useState(list.title);

	function patchList(e) {
		dispatch(renameList({ list, title }));
		dispatch(hideModal());
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (<div id="modal-container">
		<div id="modal-title">Rename list</div>
		<button id="modal-x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div>List name</div>
		<input id="modal-input"
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter" && title.trim().length && title.trim().length < 51) {
					patchList(e);
				}
			}}
		/>
		<div>
			<button id="modal-add-button" className="modal-button"
				onClick={patchList}
				disabled={!title.trim().length || title.trim().length > 50}
			>
				{title.trim().length < 51 ? "Save" : "Title too long"}
			</button>
			<button id="modal-cancel-button" className="modal-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
