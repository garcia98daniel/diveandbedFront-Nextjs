import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import 
{
    registerCleanForm, 
    registerError, 
    registerSuccess,
    registerResetState
} from "./actions";
import {REGISTER_REQUESTING} from "./constants";
import {handlerAlertModal} from "../../generalsEffects/actions";

const registerUrl = `${ROUTE_ENDPOINT}/auth/register`;

const registerApi = (values) => {
    let body = {
        name: values.name,
        email: values.email,
        password: values.password,
    };
    return fetch(`${registerUrl}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

function* registerFlow(action) {
    try {
        // console.log(action);
        const {values} = action;
        yield call(registerApi, values);
        yield put(registerSuccess());
        yield put(registerResetState());
        yield put(registerCleanForm());
        yield put(handlerAlertModal('success', 'User created successfully.'));
    } catch (error) {
        // yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
        yield put(registerError(error));
    }
}

function* registerWatcher() {
    yield all([
        takeEvery(REGISTER_REQUESTING, registerFlow),
    ])
}

export default registerWatcher;