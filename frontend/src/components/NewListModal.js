import { useState } from "react";
import { useDispatch } from "react-redux"
import { createList } from "../store/lists";
import { hideModal } from "../store/modal";
import { useHistory } from "react-router-dom";
import "./css/ListModals.css";

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

	return (<div id="new-list-container">
		<div id="new-list-title">Add a list</div>
		<button id="x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div>Please enter a new list name:</div>
		<input id="new-list-input"
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter" && title.trim().length) {
					postList();
				}
			}}
		/>
		<div>
			<button id="new-list-add-button"
				onClick={postList}
				disabled={!title.trim().length}
			>
				Add
			</button>
			<button id="new-list-cancel-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
