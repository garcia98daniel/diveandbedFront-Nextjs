import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    GET_CENTER_REQUESTING
} from "./constants";

import {
    getCenterSuccess,
    getCenterError,

    centerPageResetState
} from "../centerPage/actions";

const centersUrl = `${ROUTE_ENDPOINT}/centers`;

const getCenterAPI = (lang, id) => {
    return fetch(`${centersUrl}/get/${lang}/${id}`, {
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

function* getCenterFlow(action) {
    try {
        const {lang, id} = action;
        const center = yield call(getCenterAPI, lang, id);
        yield put(getCenterSuccess(center.data));
        yield put(centerPageResetState());
    } catch (error) {
        yield put(getCenterError(error));
    }
}

function* centerWatcher() {
    yield all([
        takeEvery(GET_CENTER_REQUESTING, getCenterFlow),
    ])
}

export default centerWatcher;
