import {
        GET_CENTER_REQUESTING,
        GET_CENTER_SUCCESS,
        GET_CENTER_ERROR,

        CENTER_PAGE_RESET_STATE,
} from "./constants";


export const getCenterRequesting = (lang, id) => ({
    type: GET_CENTER_REQUESTING,
    lang, id
});
export const getCenterSuccess = (center) => ({
    type: GET_CENTER_SUCCESS,
    center
});
export const getCenterError = (error) => ({
    type: GET_CENTER_ERROR,
    error
});

export const centerPageResetState = () => ({
    type: CENTER_PAGE_RESET_STATE,
});