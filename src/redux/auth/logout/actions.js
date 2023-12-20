import {LOGOUT_ERROR, LOGOUT_REQUESTING, LOGOUT_SUCCESS} from "./constants";

export const logoutRequesting = (token) => ({
    type: LOGOUT_REQUESTING,
    token,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutError = (error) => ({
    type: LOGOUT_ERROR,
    error,
});