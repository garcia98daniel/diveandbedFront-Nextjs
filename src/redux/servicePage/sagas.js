import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    GET_SERVICE_REQUESTING,
    SERVICE_PAGE_GET_POPULAR_ACTIVITIES_REQUESTING,
    SERVICE_PAGE_GET_POPULAR_LODGING_REQUESTING,
    SERVICE_PAGE_GET_QUESTIONS_REQUESTING,
    SERVICE_PAGE_POST_QUESTION_REQUESTING,
} from "./constants";

import {
    getServiceSuccess,
    getServiceError,

    servicePage_getPopularActivitiesSuccess,
    servicePage_getPopularActivitiesError,

    servicePage_getPopularLodgingSuccess,
    servicePage_getPopularLodgingError,

    servicePage_getQuestionsSuccess,
    servicePage_getQuestionsError,

    servicePage_postQuestionSuccess,
    servicePage_postQuestionError,

    servicePageResetState
} from "../servicePage/actions";

const serviceUrl = `${ROUTE_ENDPOINT}/activity`;
const backEndUrl = `${ROUTE_ENDPOINT}`;

const getServiceAPI = (lang, id) => {
    return fetch(`${serviceUrl}/get/${id}`, {
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

function* getServiceFlow(action) {
    try {
        const {lang, id} = action;
        const service = yield call(getServiceAPI, lang, id);
        yield put(getServiceSuccess(service.data));
        yield put(servicePageResetState());
    } catch (error) {
        yield put(getServiceError(error));
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
        yield put(servicePage_getPopularActivitiesSuccess(popular_activities.data));
        yield put(servicePageResetState());
    } catch (error) {
        yield put(servicePage_getPopularActivitiesError(error));
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
        yield put(servicePage_getPopularLodgingSuccess(popular_lodging.data));
        yield put(servicePageResetState());
    } catch (error) {
        yield put(servicePage_getPopularLodgingError(error));
    }
}

const getQuestionsAPI = (service_id) => {
    return fetch(`${serviceUrl}/question/${service_id}`, {
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

function* getQuestionsFlow(action) {
    try {
        const {service_id} = action;
        const questions = yield call(getQuestionsAPI, service_id);
        yield put(servicePage_getQuestionsSuccess(questions.data));
        yield put(servicePageResetState());
    } catch (error) {
        yield put(servicePage_getQuestionsError(error));
    }
}

const postQuestionAPI = (service_id, question, token) => {
    // console.log(token)
        let body = {
            activityId: service_id,
            question: question
        };
        return fetch(`${serviceUrl}/question`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body)
                })
                .then(response => {
                    if (response.status === 500)
                        throw "Error interno del servidor";
    
                    return response.json()
                })
                .then(json => {
                    if(json.hasOwnProperty('error')){
                        throw json;
                    }
    
                    if (json.statusCode === 400){
                        throw json;
                    }
    
                    if (json.statusCode === 201){
                        return true;
                    }
    
                    throw json;
                }).catch(error => {
                    throw error;
                })
};

function* postQuestionFlow(action) {
    try {
        const {service_id, question, token} = action;
        const res = yield call(postQuestionAPI, service_id, question, token);
        yield put(servicePage_postQuestionSuccess(question));
        yield put(servicePageResetState());
    } catch (error) {
        yield put(servicePage_postQuestionError(error));
        yield put(servicePageResetState());
    }
}


function* serviceWatcher() {
    yield all([
        takeEvery(GET_SERVICE_REQUESTING, getServiceFlow),
        takeEvery(SERVICE_PAGE_GET_POPULAR_ACTIVITIES_REQUESTING, getPopularActivitiesFlow),
        takeEvery(SERVICE_PAGE_GET_POPULAR_LODGING_REQUESTING, getPopularLodgingFlow),
        takeEvery(SERVICE_PAGE_GET_QUESTIONS_REQUESTING, getQuestionsFlow),
        takeEvery(SERVICE_PAGE_POST_QUESTION_REQUESTING, postQuestionFlow),
    ])
}

export default serviceWatcher;
