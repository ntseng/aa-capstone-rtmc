import { useState } from "react";
import { useDispatch } from "react-redux"
import { createList } from "../store/lists";
import { hideModal } from "../store/modal";
import "./css/NewListModal.css";

export default function NewListModal({ ownerId }) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	return (<div id="new-list-container">
		<div id="new-list-title">Add a list</div>
		<button id="x-button"
			onClick={e => dispatch(hideModal())}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div>Please enter a new list name:</div>
		<input id="new-list-input"
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
		/>
		<div>
			<button id="new-list-add-button"
				onClick={e => {
					dispatch(createList({ ownerId, title }));
					dispatch(hideModal());
				}}
				disabled={!title}
			>
				Add
			</button>
			<button id="new-list-cancel-button"
				onClick={e => dispatch(hideModal())}
			>
				Cancel
			</button>
		</div>
	</div >)
}
