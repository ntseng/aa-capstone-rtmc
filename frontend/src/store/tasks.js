import { csrfFetch } from "./csrf";

const GET_TASKS = "tasks/GET_TASKS";
const SELECT_TASKS = "tasks/SELECT_TASKS";

const getTasks = (tasks) => ({
	type: GET_TASKS,
	tasks
});

export const fetchAllTasks = function ({ userId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${userId}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

export const fetchSelectedTasks = function ({ userId, listId, searchTerm }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${userId}/${listId}/${searchTerm}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

export default function reducer(stateDotTasks = {}, action) {
	let updatedState = { ...stateDotTasks };
	switch (action.type) {
		case GET_TASKS:
		case SELECT_TASKS:
			action.tasks.forEach(task => {
				updatedState[task.id] = task;
			})
			return updatedState;
		default:
			return stateDotTasks;
	}
}
