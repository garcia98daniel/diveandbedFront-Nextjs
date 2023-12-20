import {
    LOGIN_CHANGE_FORM,
    LOGIN_ERROR,
    LOGIN_REQUESTING, LOGIN_RESET_STATES, 
    LOGIN_SUCCESS,
} from "./constants";

export const loginRequesting = (values) => ({
    type: LOGIN_REQUESTING,
    values,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error,
});

export const loginChangeForm = (key, value) => ({
    type: LOGIN_CHANGE_FORM,
    key, value,
});

export const loginResetStates = () => ({
    type: LOGIN_RESET_STATES,
});