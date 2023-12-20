import {

    
    CREATE_CHECK_OUT_LODGING_RESERVATION_REQUESTING,
    CREATE_CHECK_OUT_LODGING_RESERVATION_SUCCESS,
    CREATE_CHECK_OUT_LODGING_RESERVATION_ERROR,

    CHECK_OUT_LODGING_CHANGE_VALUES,
    CHECK_OUT_LODGING_TOGGLE_MODAL,
    CHECK_OUT_LODGING_RESET_STATE,
} from "./constants";


export const createCheckOutLodgingReservationRequesting = (values, token) => ({
    type: CREATE_CHECK_OUT_LODGING_RESERVATION_REQUESTING,
    values, token
});
export const createCheckOutLodgingReservationSuccess = () => ({
    type: CREATE_CHECK_OUT_LODGING_RESERVATION_SUCCESS,
});
export const createCheckOutLodgingReservationError = (error) => ({
    type: CREATE_CHECK_OUT_LODGING_RESERVATION_ERROR,
    error
});



export const checkOutLodgingChangeValues = (key, value) => ({
    type: CHECK_OUT_LODGING_CHANGE_VALUES,
    key, value
});


export const checkOutLodgingToggleModal = (bool) => ({
    type: CHECK_OUT_LODGING_TOGGLE_MODAL,
    bool
});



export const checkOutLodgingResetState = () => ({
    type: CHECK_OUT_LODGING_RESET_STATE,
});