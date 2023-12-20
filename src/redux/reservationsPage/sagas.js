import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    GET_RESERVATIONS_REQUESTING
} from "./constants";

import {
    getReservationsSuccess,
    getReservationsError,

    reservationsPageResetState
} from "../reservationsPage/actions";

const reservationsUrl = `${ROUTE_ENDPOINT}/booking`;

const getReservationsAPI = (token, user_id) => {
    return fetch(`${reservationsUrl}/user/${user_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(json => {
            if(json.hasOwnProperty('error')){
                throw json;
            }

            if (json.statusCode === 500){
                throw json;
            }
            if (json.statusCode === 400){
                throw json;
            }
            if (json.statusCode === 401){
                throw json;
            }

            if (json.statusCode === 200){
                return json;
            }

        }).catch((error) => {
            throw error;
        })
};

function* getReservationsFlow(action) {
    try {
        const {token, user_id} = action;
        const reservations = yield call(getReservationsAPI, token, user_id);
        yield put(getReservationsSuccess(reservations.data));
        yield put(reservationsPageResetState());
    } catch (error) {
        yield put(getReservationsError(error));
    }
}

function* reservationsWatcher() {
    yield all([
        takeEvery(GET_RESERVATIONS_REQUESTING, getReservationsFlow),
    ])
}

export default reservationsWatcher;
