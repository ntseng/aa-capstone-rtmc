import { useState } from "react";
import { useDispatch } from "react-redux"
import { createList } from "../store/lists";
import { hideModal } from "../store/modal";
import { useHistory } from "react-router-dom";
import "./css/Modal.css";

export default function NewListModal({ ownerId }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [title, setTitle] = useState("");

	function postList(e) {
		dispatch(createList({ ownerId, title })).then(list => {
			dispatch(hideModal());
			history.push(`/app/${list.id}`);
		});
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (<div id="modal-container">
		<div id="modal-title">Add a list</div>
		<button id="modal-x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div>Please enter a new list name:</div>
		<input id="modal-input"
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter" && title.trim().length && title.trim().length < 51) {
					postList();
				}
			}}
		/>
		<div>
			<button id="modal-add-button" className="modal-button"
				onClick={postList}
				disabled={!title.trim().length || title.trim().length > 50}
			>
				{title.trim().length < 51 ? "Add" : "Title too long"}
			</button>
			<button id="modal-cancel-button" className="modal-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
