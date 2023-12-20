import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    GET_ZONE_REQUESTING,
} from "./constants";

import {
    getZoneSuccess,
    getZoneError,

    zonePageResetState
} from "./actions";

const zonegsUrl = `${ROUTE_ENDPOINT}/zone`;

const getZoneAPI = (id) => {
    return fetch(`${zonegsUrl}/get-slug/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PUBLIC_TOKEN}`,
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

function* getZoneFlow(action) {
    try {
        const {id} = action;
        const zone = yield call(getZoneAPI, id);
        yield put(getZoneSuccess(zone.data));
        yield put(zonePageResetState());
    } catch (error) {
        yield put(getZoneError(error));
    }
}


function* zoneWatcher() {
    yield all([
        takeEvery(GET_ZONE_REQUESTING, getZoneFlow),

    ])
}

export default zoneWatcher;
