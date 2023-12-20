import {
    ROUTE_ENDPOINT,
    PUBLIC_TOKEN
} from "../../utils/route";

import {call, all, put, takeEvery} from 'redux-saga/effects';

import {
    GET_SUBCATEGORIES_REQUESTING,
    
} from "./constants";

import {
    getSubcategoriesSuccess,
    getSubcategoriesError,

    resultResetState
} from "./actions";

const baseUrl = `${ROUTE_ENDPOINT}`;

const getSubcategoriesAPI = () => {

    return fetch(`${baseUrl}/subcategory`, {
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

function* getSubcategoriesFlow() {
    try {
        const subCategories = yield call(getSubcategoriesAPI);
        yield put(getSubcategoriesSuccess(subCategories.data));
        yield put(resultResetState());
    } catch (error) {
        yield put(getSubcategoriesError(error));
    }
}

function* resultWatcher() {
    yield all([
        takeEvery(GET_SUBCATEGORIES_REQUESTING, getSubcategoriesFlow),
    ])
}

export default resultWatcher;
