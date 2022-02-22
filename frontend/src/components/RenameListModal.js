import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { renameList } from "../store/lists";
import { hideModal } from "../store/modal";
import "./css/ListModals.css";

export default function RenameListModal({ listId }) {
	const dispatch = useDispatch();
	const list = useSelector(state => state.lists[listId]);
	const [title, setTitle] = useState(list.title);

	return (<div id="new-list-container">
		<div id="new-list-title">Rename list</div>
		<button id="x-button"
			onClick={e => dispatch(hideModal())}
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
					dispatch(renameList({ list, title }));
					dispatch(hideModal());
				}
			}}
		/>
		<div>
			<button id="new-list-add-button"
				onClick={e => {
					dispatch(renameList({ list, title }));
					dispatch(hideModal());
				}}
				disabled={!title.trim().length}
			>
				Save
			</button>
			<button id="new-list-cancel-button"
				onClick={e => dispatch(hideModal())}
			>
				Cancel
			</button>
		</div>
	</div >)
}
