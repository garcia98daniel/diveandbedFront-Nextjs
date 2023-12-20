import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {logoutSuccess, logoutError} from "./actions";
import {LOGOUT_REQUESTING} from "./constants";
import {clientUnset} from "../../client/actions";
import {userResetStatesLogout} from "../user/actions";
// import {handlerAlertModal} from "../../menusModals/actions";

const logoutUrl = `${ROUTE_ENDPOINT}/logout`;

const logoutApi = (token) => {
    return fetch(`${logoutUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {

            if(response.status === 500){
                throw "Error interno del servidor"
            }
            return response.json();
        })
        .then(json => {
                return json;
        }).catch((error) => {
            throw error;
        })
};

function* logoutFlow(action) {
    try {
        const {token} = action;
        // yield call(logoutApi, token);
        // yield put(logoutSuccess());
        yield put(clientUnset());
        localStorage.clear();
        yield put(userResetStatesLogout());
    } catch (error) {
        localStorage.clear();
        yield put(logoutError(error));
    }
}

function* logoutWatcher() {
    yield all([
        takeEvery(LOGOUT_REQUESTING, logoutFlow),
    ])
}

export default logoutWatcher;