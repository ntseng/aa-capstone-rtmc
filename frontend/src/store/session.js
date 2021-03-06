import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const login = ({ credential, password }) => async dispatch => {
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({ credential, password }),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const demoLogin = () => async dispatch => {
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({ credential: "Demo-lition", password: "password" }),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const restoreUser = () => async dispatch => {
	const response = await csrfFetch("/api/session");
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, email, password } = user;
	const inboxResponse = await csrfFetch("/api/lists/", {
		method: "POST",
		body: JSON.stringify({
			ownerId: null,
			title: "Inbox"
		})
	})
	const { list: inbox } = await inboxResponse.json();
	const response = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			username,
			email,
			password,
			inboxId: inbox.id
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	await csrfFetch("/api/lists/", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			listId: inbox.id,
			ownerId: data.user.id
		})
	})

	await csrfFetch("/api/lists/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			ownerId: data.user.id,
			title: "Work"
		})
	})
	await csrfFetch("/api/lists/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			ownerId: data.user.id,
			title: "Personal"
		})
	})

	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "DELETE",
	});
	dispatch(removeUser());
	return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state, { user: action.payload });
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state, { user: null });
			return newState;
		default:
			return state;
	}
}

export default reducer;
