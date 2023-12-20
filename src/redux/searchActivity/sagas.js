import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    SEARCH_REQUESTING,
    GET_FILTER_OPTIONS_REQUESTING,
    
} from "./constants";

import {
    searchSuccess,
    searchError,

    getFilterOptionsSuccess,
    getFilterOptionsError,

    searchResetState
} from "./actions";

import {
    setDataResult
} from "../searchPage/actions";

const searchUrl = `${ROUTE_ENDPOINT}/search`;

const getSearchAPI = (values, language) => {

    let queryString = `?type=${values.type}&levelExperience=${values.levelExperience}&language=${language}&startDate=${"17/1/2023"}&page=${values.page}&limit=${values.limit}&pax=${values.pax.length}&minPrice=${values.minPrice}&maxPrice=${values.maxPrice}&sortBy=${values.sortBy}&sortOrder=${values.sortOrder}&subCategory=${values.subCategory_id}&zones=${values.zones}&services=${values.services}&languages=${values.languages}
    `;

    return fetch(`${searchUrl}${queryString}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => {
            // console.log(response.status)
            if (response.status === 500)
                throw "Error interno del servidor";

            return response.json()
        })
        .then(json => {
            // console.log(json);

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


const getPopularActivitiesAPI = (language) => {
    return fetch(`${ROUTE_ENDPOINT}/activity/popular/${language}`, {
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

function* getSearchFlow(action) {
    try {
        const {values, language} = action;

        if(values.type === "activity"){
            // alert(values.type)
            const popular_activities = yield call(getPopularActivitiesAPI, language);
            // console.log(popular_activities)
            yield put(searchSuccess());
            yield put(setDataResult(popular_activities.data));
        }else{
            // console.log(language)
            const filterOptions = yield call(getSearchAPI, values, language);
            yield put(searchSuccess());
            yield put(setDataResult(filterOptions.data));
        }
        yield put(searchResetState());
    } catch (error) {
        yield put(setDataResult([]));
        yield put(searchError(error));
    }
}

const getFilterOptionsAPI = (values) => {
    let queryString = `?type=${values.type}&levelExperience=${values.levelExperience}&language=${values.language}&startDate=${values.startDate}&pax=${values.pax.length}&sortBy=${values.sortBy}&sortOrder=${values.sortOrder}&subCategory=${values.subCategory_id}&zones=${values.zones}&services=${values.services}&languages=${values.languages}`;

    // let queryString = `?type=${values.type}
    // &levelExperience=${values.levelExperience}
    // &language=${values.language}
    // &startDate=${values.startDate}
    // &pax=${values.pax}
    // &minPrice=${values.minPrice}
    // &maxPrice=${values.maxPrice}
    // &sortBy=${values.sortBy}
    // &sortOrder=${values.sortOrder}
    // &subCategory=${values.subCategory_id}
    // &zones=${values.zones}
    // &services=${values.services}
    // &languages=${values.languages}`;

    return fetch(`${searchUrl}/filters/get${queryString}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => {
            // console.log(response.status)
            if (response.status === 500)
                throw "Error interno del servidor";

            return response.json()
        })
        .then(json => {
            // console.log(json);

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

function* getFilterOptionsFlow(action) {
    try {
        const {values} = action;
        const result = yield call(getFilterOptionsAPI, values);
        yield put(getFilterOptionsSuccess(result.data));
        yield put(searchResetState());
    } catch (error) {
        yield put(getFilterOptionsError(error));
    }
}

function* searchActivityWatcher() {
    yield all([
        takeEvery(SEARCH_REQUESTING, getSearchFlow),
        takeEvery(GET_FILTER_OPTIONS_REQUESTING, getFilterOptionsFlow),
    ])
}

export default searchActivityWatcher;
