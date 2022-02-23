import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { renameList } from "../store/lists";
import { hideModal } from "../store/modal";
import "./css/ListModals.css";

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

	return (<div id="new-list-container">
		<div id="new-list-title">Rename list</div>
		<button id="x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div>List name</div>
		<input id="new-list-input"
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter" && title.trim().length) {
					patchList(e);
				}
			}}
		/>
		<div>
			<button id="new-list-add-button"
				onClick={patchList}
				disabled={!title.trim().length}
			>
				Save
			</button>
			<button id="new-list-cancel-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
