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

export default function reducer(stateDotLists = {}, action) {
	let updatedState = { ...stateDotLists };
	switch (action.type) {
		case GET_LISTS:
			action.lists.forEach(list => {
				updatedState[list.id] = list;
			})
			return updatedState;
		default:
			return stateDotLists;
	}
}
