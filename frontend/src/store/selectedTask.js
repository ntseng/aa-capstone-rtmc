const SET_TASK = "selectedTask/SET_TASK";

const setTask = (task) => ({
	type: SET_TASK,
	task
})

export const selectTask = function (task) {
	return async dispatch => {
		dispatch(setTask(task));
		return task;
	}
}

export default function reducer(stateDotSelectedTask = {}, action) {
	switch (action.type) {
		case SET_TASK:
			return action.task;
		default:
			return stateDotSelectedTask;
	}
}
