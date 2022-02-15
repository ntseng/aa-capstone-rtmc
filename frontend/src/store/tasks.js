import { csrfFetch } from "./csrf";

const GET_TASKS = "tasks/GET_TASKS";

const getTasks = (tasks) => ({
	type: GET_TASKS,
	tasks
});

export const fetchAllTasks = function ({ ownerId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${ownerId}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

export const fetchTasksFromList = function ({ ownerId, listId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${ownerId}/${listId}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

export const fetchSearchedTasks = function ({ ownerId, searchTerm }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/search/${ownerId}/${searchTerm}`);
		const { tasks } = await response.json();
		dispatch(getTasks(tasks));
		return response;
	}
}

const POST_TASK = "tasks/POST_TASK";

const postTask = (task) => ({
	type: POST_TASK,
	task
})

export const createTask = function ({ ownerId, listId, title }) {
	return async dispatch => {
		const response = await csrfFetch("/api/tasks/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				ownerId,
				listId,
				title
			})
		})
		const task = await response.json();
		dispatch(postTask(task));
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
		case POST_TASK:
			updatedState[action.task.id] = action.task;
			return updatedState;
		default:
			return stateDotTasks;
	}
}
