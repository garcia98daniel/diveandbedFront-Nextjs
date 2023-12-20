import {ROUTE_ENDPOINT} from "../../utils/route";
import {call, all, put, takeEvery} from 'redux-saga/effects';

import { 
    GET_CATEGORIES_REQUESTING,
    GET_POPULAR_ACTIVITIES_REQUESTING,
    GET_POPULAR_LODGING_REQUESTING,
    GET_POPULAR_CENTERS_REQUESTING,
 } from './constants';

import { 
    getCategoriesSuccess,
    getCategoriesError,

    getPopularActivitiesSuccess,
    getPopularActivitiesError,

    getPopularLodgingSuccess,
    getPopularLodgingError,

    getPopularCentersSuccess,
    getPopularCentersError,
    
    homePageResetState,
 } from './actions';
// import {handlerAlertModal} from "../menusModals/actions";


const backEndUrl = `${ROUTE_ENDPOINT}`;

const getCategoriesAPI = (token) => {
    return fetch(`${backEndUrl}/category`, {
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

function* getCategoriesFlow(action) {
    try {
        // const {token} = action;
        const categories = yield call(getCategoriesAPI);
        yield put(getCategoriesSuccess(categories.data));
        yield put(homePageResetState());
    } catch (error) {
        yield put(getCategoriesError(error));
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
        yield put(homePageResetState());
    } catch (error) {
        yield put(getPopularActivitiesError(error));
    }
}


const getPopularLodgingAPI = (language) => {
    return fetch(`${backEndUrl}/lodging/popular/${language}`, {
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

function* getPopularLodgingFlow(action) {
    try {
        const {language} = action;
        const popular_lodging = yield call(getPopularLodgingAPI, language);
        yield put(getPopularLodgingSuccess(popular_lodging.data));
        yield put(homePageResetState());
    } catch (error) {
        yield put(getPopularLodgingError(error));
    }
}


const getBestCentersAPI = (language) => {
    return fetch(`${backEndUrl}/centers/popular/${language}`, {
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

function* getBestCentersFlow(action) {
    try {
        const {language} = action;
        const best_centers = yield call(getBestCentersAPI, language);
        yield put(getPopularCentersSuccess(best_centers.data));
        yield put(homePageResetState());
    } catch (error) {
        yield put(getPopularCentersError(error));
    }
}

function* homePageWatcher() {
    yield all([
        takeEvery(GET_CATEGORIES_REQUESTING, getCategoriesFlow),
        takeEvery(GET_POPULAR_ACTIVITIES_REQUESTING, getPopularActivitiesFlow),
        takeEvery(GET_POPULAR_LODGING_REQUESTING, getPopularLodgingFlow),
        takeEvery(GET_POPULAR_CENTERS_REQUESTING, getBestCentersFlow),
    ])
}

export default homePageWatcher;
