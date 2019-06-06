import axios from '../../axios-api';
import {REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS,LOGIN_USER_FAILURE,LOGIN_USER_SUCCESS} from "./actionTypes";
import {push} from 'connected-react-router';


const registerUserSuccess = () => {
	return {type: REGISTER_USER_SUCCESS};
};

const registerUserFailure = error => {
	return {type: REGISTER_USER_FAILURE, error};
};

export const registerUser = userData => {
	return dispatch => {
		return axios.post('/users', userData).then(
			response => {
				dispatch(registerUserSuccess());
				dispatch(push('/'));
			},
			error => {
				if (error.response && error.response.data) {
					dispatch(registerUserFailure(error.response.data))
				} else {
					dispatch(registerUserFailure({global: "No internet connection"}))
				}
			}
		);
	};
};

export const loginUserSuccess = user => {
	return {type: LOGIN_USER_SUCCESS, user};
};

export const loginUserFailure = error => {
	return {type: LOGIN_USER_FAILURE, error};
};

export const loginUser = userData => {
	return dispatch => {
		return axios.post('/users/session', userData).then(
			response => {
				dispatch(loginUserSuccess(response.data));
				dispatch(push('/'));
			},
			error => {
				dispatch(loginUserFailure(error.response.data));
			}
		);
	};
};

