import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {
    loginSuccess,
    loginError,
    loginResetStates,
} from "./actions";
import {LOGIN_REQUESTING} from "./constants";
import {clientSet} from "../../client/actions";
import {userGetSuccess} from "../user/actions";

// import {handlerAlertModal} from "../../menusModals/actions";
const loginUrl = `${ROUTE_ENDPOINT}/auth/login`;

const loginApi = (values) => {
    let body = {
        email: values.email,
        password: values.password,
    };
    return fetch(`${loginUrl}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            // console.log(response.status)
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
            if (json.statusCode === 401){
                throw json;
            }

            if (json.data.hasOwnProperty('accessToken')){
                return json;
            }

        throw json;
        }).catch((error) => {
            throw error;
        })
};

function* loginFlow(action) {
    try {
        const {values} = action;
        const user = yield call(loginApi, values);
        yield put(loginSuccess());
        // console.log(user)
        yield put(userGetSuccess(user.data.user));
        yield put(clientSet(user.data.accessToken));
        yield put(loginResetStates());
    } catch (error) {
        // yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
        yield put(loginError(error));
    }
}

function* loginWatcher() {
    yield all([
        takeEvery(LOGIN_REQUESTING, loginFlow),
    ])
}

export default loginWatcher;
