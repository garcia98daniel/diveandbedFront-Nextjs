import {
    // SET_POSITION,
    USER_CHANGE_FORM,
    USER_GET_ERROR,
    USER_GET_REQUESTING,
    USER_GET_SUCCESS,
    USER_UPDATE_ERROR, 
    USER_UPDATE_REQUESTING,
    USER_UPDATE_SUCCESS,
    USER_RESET_STATES, 
    USER_RESET_STATES_LOGOUT,
    USER_MODAL_PHOTOS_TOGGLE,
    
} from "./constants";

export const userGetRequesting = (token) => ({
    type: USER_GET_REQUESTING,
    token,
});

export const userGetSuccess = (user) => ({
    type: USER_GET_SUCCESS,
    user,
});

export const userGetError = (error) => ({
    type: USER_GET_ERROR,
    error,
});


export const userUpdateRequesting = (token, values) => ({
    type: USER_UPDATE_REQUESTING,
    token, values,
});

export const userUpdateSuccess = (user) => ({
    type: USER_UPDATE_SUCCESS,
    user,
});

export const userUpdateError = (error) => ({
    type: USER_UPDATE_ERROR,
    error,
});


export const userChangeForm = (key, value) => ({
    type: USER_CHANGE_FORM,
    key, value,
});



export const userModalPhotosToggle = (bool) => ({
    type: USER_MODAL_PHOTOS_TOGGLE,
    bool
});


export const userResetStates = () => ({
    type: USER_RESET_STATES,
});

export const userResetStatesLogout = () => ({
    type: USER_RESET_STATES_LOGOUT,
});
