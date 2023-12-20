import {
        GET_RESERVATIONS_REQUESTING,
        GET_RESERVATIONS_SUCCESS,
        GET_RESERVATIONS_ERROR,
        RESERVATIONS_PAGE_RESET_STATE,
} from "./constants";


export const getReservationsRequesting = (token, user_id) => ({
    type: GET_RESERVATIONS_REQUESTING,
    token, user_id
});
export const getReservationsSuccess = (reservations) => ({
    type: GET_RESERVATIONS_SUCCESS,
    reservations
});
export const getReservationsError = (error) => ({
    type: GET_RESERVATIONS_ERROR,
    error
});

export const reservationsPageResetState = () => ({
    type: RESERVATIONS_PAGE_RESET_STATE,
});