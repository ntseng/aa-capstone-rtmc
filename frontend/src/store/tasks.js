import { csrfFetch } from "./csrf";

const GET_TASKS = "tasks/GET_TASKS";

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

export const fetchTasksFromList = function ({ userId, listId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${userId}/${listId}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

export const fetchSearchedTasks = function ({ userId, searchTerm }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/search/${userId}/${searchTerm}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

export default function reducer(stateDotTasks = {}, action) {
	let updatedState = { ...stateDotTasks };
	switch (action.type) {
		case GET_TASKS:
			action.tasks.forEach(task => {
				updatedState[task.id] = task;
			})
			return updatedState;
		default:
			return stateDotTasks;
	}
}
