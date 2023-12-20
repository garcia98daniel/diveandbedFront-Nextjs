import {

    
    CREATE_CHECK_OUT_SERVICE_RESERVATION_REQUESTING,
    CREATE_CHECK_OUT_SERVICE_RESERVATION_SUCCESS,
    CREATE_CHECK_OUT_SERVICE_RESERVATION_ERROR,

    CHECK_OUT_SERVICE_CHANGE_VALUES,
    CHECK_OUT_SERVICE_TOGGLE_MODAL,
    CHECK_OUT_SERVICE_RESET_STATE,
} from "./constants";


export const createCheckOutServiceReservationRequesting = (values, token) => ({
    type: CREATE_CHECK_OUT_SERVICE_RESERVATION_REQUESTING,
    values, token
});
export const createCheckOutServiceReservationSuccess = () => ({
    type: CREATE_CHECK_OUT_SERVICE_RESERVATION_SUCCESS,
});
export const createCheckOutServiceReservationError = (error) => ({
    type: CREATE_CHECK_OUT_SERVICE_RESERVATION_ERROR,
    error
});



export const checkOutServiceChangeValues = (key, value) => ({
    type: CHECK_OUT_SERVICE_CHANGE_VALUES,
    key, value
});


export const checkOutServiceToggleModal = (bool) => ({
    type: CHECK_OUT_SERVICE_TOGGLE_MODAL,
    bool
});



export const checkOutServiceResetState = () => ({
    type: CHECK_OUT_SERVICE_RESET_STATE,
});