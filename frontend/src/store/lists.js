import { csrfFetch } from "./csrf";

const GET_LISTS = "lists/GET_LISTS";

const getLists = (lists) => ({
	type: GET_LISTS,
	lists
})

export const fetchLists = function ({ ownerId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/lists/${ownerId}`).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ["An error occurred. Please try again."];
			}
			return response;
		});

		if (!response.errors) {
			const { lists } = await response.json();
			dispatch(getLists(lists));
			return lists;
		} else {
			return response.errors;
		}
	}
}

const POST_LIST = "lists/POST_LIST";

const postList = (list) => ({
	type: POST_LIST,
	list
})

export const createList = function ({ ownerId, title }) {
	return async dispatch => {
		const response = await csrfFetch("/api/lists/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ownerId, title })
		}).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			const { list } = await response.json();
			dispatch(postList(list));
			return list;
		} else {
			return response.errors;
		}
	}
}

const PATCH_LIST = "lists/PATCH_LIST";

const patchList = (list) => ({
	type: PATCH_LIST,
	list
})

export const renameList = function ({ list, title }) {
	return async dispatch => {
		const response = await csrfFetch("/api/lists/", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				listId: list.id,
				title: title || list.title
			})
		}).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			const { list: updatedList } = await response.json();
			dispatch(patchList(updatedList));
			return updatedList;
		} else {
			return response.errors;
		}
	}
}

const DELETE_LIST = "lists/DELETE_LIST";

const deleteList = (listId) => ({
	type: DELETE_LIST,
	listId
})

export const trashList = function ({ listId, ownerId, inboxId }) {
	return async dispatch => {
		const response = await csrfFetch("/api/lists/", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ listId })
		}).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			dispatch(deleteList(listId));
			const fetchTasks = await csrfFetch(`/api/tasks/${ownerId}/${listId}`);
			const { tasks } = await fetchTasks.json();
			tasks.forEach(async task => {
				await csrfFetch("/api/tasks/", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						taskId: task.id,
						listId: inboxId,
						title: task.title,
						done: task.done,
						dueDate: task.dueDate,
						notes: task.notes
					})
				})
			})
			return listId;
		} else {
			return response.errors;
		}
	}
}

export default function reducer(stateDotLists = {}, action) {
	let updatedState = { ...stateDotLists };
	switch (action.type) {
		case GET_LISTS:
			let cleanState = {};
			action.lists.forEach(list => {
				cleanState[list.id] = list;
			})
			return cleanState;
		case POST_LIST:
		case PATCH_LIST:
			updatedState[action.list.id] = action.list;
			return updatedState;
		case DELETE_LIST:
			delete updatedState[action.listId];
			return updatedState;
		default:
			return stateDotLists;
	}
}
