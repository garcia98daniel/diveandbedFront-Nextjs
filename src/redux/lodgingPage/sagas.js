import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    GET_LODGING_REQUESTING,
    GET_POPULAR_ACTIVITIES_REQUESTING,
} from "./constants";

import {
    getLodgingSuccess,
    getLodgingError,

    getPopularActivitiesSuccess,
    getPopularActivitiesError,

    lodgingPageResetState
} from "./actions";

const lodgingsUrl = `${ROUTE_ENDPOINT}/lodging`;
const backEndUrl = `${ROUTE_ENDPOINT}`;

const getLodgingAPI = (lang, id) => {
    return fetch(`${lodgingsUrl}/get/${id}`, {
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

function* getLodgingFlow(action) {
    try {
        const {lang, id} = action;
        const lodging = yield call(getLodgingAPI, lang, id);
        yield put(getLodgingSuccess(lodging.data));
        yield put(lodgingPageResetState());
    } catch (error) {
        yield put(getLodgingError(error));
    }
}

const getPopularActivitiesAPI = (language) => {
    return fetch(`${backEndUrl}/activity/popular/${language}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(json => {
            if(json.hasOwnProperty('error')){
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

function* getPopularActivitiesFlow(action) {
    try {
        const {language} = action;
        const popular_activities = yield call(getPopularActivitiesAPI, language);
        yield put(getPopularActivitiesSuccess(popular_activities.data));
        yield put(lodgingPageResetState());
    } catch (error) {
        yield put(getPopularActivitiesError(error));
    }
}

function* lodgingWatcher() {
    yield all([
        takeEvery(GET_LODGING_REQUESTING, getLodgingFlow),
        takeEvery(GET_POPULAR_ACTIVITIES_REQUESTING, getPopularActivitiesFlow),

    ])
}

export default lodgingWatcher;
