import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    CREATE_CHECK_OUT_LODGING_RESERVATION_REQUESTING,
} from "./constants";

import {
    createCheckOutLodgingReservationSuccess,
    createCheckOutLodgingReservationError,
    checkOutLodgingResetState,
} from "../checkOutLodging/actions";

const lodgingCheckOutUrl = `${ROUTE_ENDPOINT}/booking`;

const createLodgingAPI = (values, token) => {
    return fetch(`${lodgingCheckOutUrl}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values)

    })
    .then(response => {
        // console.log(response.status)
        if (response.status === 500)
            throw "Error interno del servidor";

        return response.json()
    }).then(json => {
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
            if (json.statusCode === 201){
                return json;
            }

        }).catch((error) => {
            throw error;
        })
};

function* createLodgingFlow(action) {
    try {
        const {values, token} = action;
        const lodging = yield call(createLodgingAPI, values, token);
        console.log(lodging)
        console.log("checkout done")
        yield put(createCheckOutLodgingReservationSuccess(lodging.data));
        yield put(checkOutLodgingResetState());
    } catch (error) {
        yield put(createCheckOutLodgingReservationError(error));
    }
}


function* checkOutLodgingWatcher() {
    yield all([
        takeEvery(CREATE_CHECK_OUT_LODGING_RESERVATION_REQUESTING, createLodgingFlow),
    ])
}

export default checkOutLodgingWatcher;
