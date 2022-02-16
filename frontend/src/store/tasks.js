import { csrfFetch } from "./csrf";

const GET_TASKS = "tasks/GET_TASKS";

const getTasks = (tasks) => ({
	type: GET_TASKS,
	tasks
});

export const fetchAllTasks = function ({ ownerId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${ownerId}`).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			const { tasks } = await response.json();
			dispatch(getTasks(tasks));
			return tasks;
		} else {
			return response.errors;
		}
	}
}

export const fetchTasksFromList = function ({ ownerId, listId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/${ownerId}/${listId}`).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			const { tasks } = await response.json();
			dispatch(getTasks(tasks));
			return tasks;
		} else {
			return response.errors;
		}
	}
}

export const fetchSearchedTasks = function ({ ownerId, searchTerm }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/tasks/search/${ownerId}/${searchTerm}`).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			const { tasks } = await response.json();
			dispatch(getTasks(tasks));
			return tasks;
		} else {
			return response.errors;
		}
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
		}).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			const { task } = await response.json();
			dispatch(postTask(task));
			return response;
		} else {
			return response.errors;
		}
	}
}

const PATCH_TASK = "tasks/PATCH_TASK";

const patchTask = (task) => ({
	type: PATCH_TASK,
	task
})

export const editTask = function ({ task, listId, title, done, notes }) {
	return async dispatch => {
		const response = await csrfFetch("/api/tasks/", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				taskId: task.id,
				listId: listId || task.listId,
				title: title || task.title,
				done: done !== undefined ? done : task.done,
				notes: notes || task.notes
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
			const { task: updatedTask } = await response.json();
			dispatch(patchTask(updatedTask));
			return updatedTask;
		} else {
			return response.errors;
		}
	}
}

const DELETE_TASK = "tasks/DELETE_TASK";

const deleteTask = (taskId) => ({
	type: DELETE_TASK,
	taskId
})

export const trashTask = function (taskId) {
	return async dispatch => {
		const response = await csrfFetch("/api/tasks/", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ taskId })
		}).catch(async response => {
			if (response.status < 500) {
				response.errors = (await response.json()).errors;
			} else {
				response.errors = ['An error occured. Please try again.'];
			}
			return response;
		});
		if (!response.errors) {
			dispatch(deleteTask(taskId));
			return taskId;
		} else {
			return response.errors;
		}
	}
}

export default function reducer(stateDotTasks = {}, action) {
	let updatedState = { ...stateDotTasks };
	switch (action.type) {
		case GET_TASKS:
			const cleanState = {};
			action.tasks.forEach(task => {
				cleanState[task.id] = task;
			})
			return cleanState;
		case POST_TASK:
		case PATCH_TASK:
			updatedState[action.task.id] = action.task;
			return updatedState;
		case DELETE_TASK:
			delete updatedState[action.taskId];
			return updatedState;
		default:
			return stateDotTasks;
	}
}
