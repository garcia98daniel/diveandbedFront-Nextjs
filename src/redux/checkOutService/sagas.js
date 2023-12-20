import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    CREATE_CHECK_OUT_SERVICE_RESERVATION_REQUESTING,
} from "./constants";

import {
    createCheckOutServiceReservationSuccess,
    createCheckOutServiceReservationError,
    checkOutServiceResetState,
} from "../checkOutService/actions";

const serviceCheckOutUrl = `${ROUTE_ENDPOINT}/booking`;

const createServiceAPI = (values, token) => {
    return fetch(`${serviceCheckOutUrl}`, {
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

function* createServiceFlow(action) {
    try {
        const {values, token} = action;
        const service = yield call(createServiceAPI, values, token);
        // console.log(service)
        // console.log("checkout done")
        yield put(createCheckOutServiceReservationSuccess(service.data));
        yield put(checkOutServiceResetState());
    } catch (error) {
        yield put(createCheckOutServiceReservationError(error));
    }
}


function* checkOutServiceWatcher() {
    yield all([
        takeEvery(CREATE_CHECK_OUT_SERVICE_RESERVATION_REQUESTING, createServiceFlow),
    ])
}

export default checkOutServiceWatcher;
