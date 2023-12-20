import {
    FORGOT_CHANGE_FORM, 
    // FORGOT_CLEAN_FORM, 
    FORGOT_RESET_STATES,
    SEND_EMAIL_ERROR,
    SEND_EMAIL_REQUESTING,
    SEND_EMAIL_SUCCESS, 
    // RESET_PASSWORD_ERROR,
    // RESET_PASSWORD_REQUESTING, RESET_PASSWORD_SUCCESS,
    // FORGOT_RESET_ALL_STATES
} from "./constants";

export const sendEmailRequesting = (values) => ({
    type: SEND_EMAIL_REQUESTING,
    values,
});

export const sendEmailSuccess = () => ({
    type: SEND_EMAIL_SUCCESS,
});

export const sendEmailError = (error) => ({
    type: SEND_EMAIL_ERROR,
    error,
});


export const forgotChangeForm = (key, value) => ({
    type: FORGOT_CHANGE_FORM,
    key, value,
});

export const forgotResetStates = () => ({
    type: FORGOT_RESET_STATES,
});

// export const forgotCleanForm = () => ({
//     type: FORGOT_CLEAN_FORM,
// });

// export const forgotResetAllStates = () => ({
//     type: FORGOT_RESET_ALL_STATES,
// });
// export const resetPasswordRequesting = (values) => ({
//     type: RESET_PASSWORD_REQUESTING,
//     values,
// });

// export const resetPasswordSuccess = () => ({
//     type: RESET_PASSWORD_SUCCESS,
// });

// export const resetPasswordError = (error) => ({
//     type: RESET_PASSWORD_ERROR,
//     error,
// });