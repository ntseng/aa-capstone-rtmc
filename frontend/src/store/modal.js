const SET_MODAL = "modal/SET_MODAL";

const setModal = (modalName) => ({
	type: SET_MODAL,
	modalName
})

export const showModal = function (modalName) {
	return async dispatch => {
		dispatch(setModal(modalName));
		return modalName;
	}
}

export const hideModal = function () {
	return async dispatch => {
		dispatch(setModal(null));
		return null;
	}
}

export default function reducer(stateDotModal = null, action) {
	switch (action.type) {
		case SET_MODAL:
			return action.modalName;
		default:
			return stateDotModal;
	}
}
