const SET_TASK = "selectedTask/SET_TASK";

const setTask = (taskId) => ({
	type: SET_TASK,
		taskId
})

export const selectTask = function (taskId) {
	return async dispatch => {
		dispatch(setTask(taskId));
		return taskId;
	}
}

export default function reducer(stateDotSelectedTask = null, action) {
	switch (action.type) {
		case SET_TASK:
			return action.taskId;
		default:
			return stateDotSelectedTask;
	}
}
