import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
// import {DropDownHolder} from "../../../../App";
import {loginHiddenModal, loginResetStates, loginSuccess} from "../login/actions";
import {checkJWTRequesting} from "../../client/actions";
// import NavigationService from "../../../utils/NavigationService";
// import AsyncStorage from "@react-native-community/async-storage";
import {phoneVerifyError, phoneVerifySuccess} from "./actions";
import {PHONE_VERIFY_REQUESTING} from "./constants";
import {handlerAlertModal} from "../../menusModals/actions";

const verifyPhoneUrl = `${ROUTE_ENDPOINT}/verifyPhone`;

const setTokenStorage = (token) => {
    AsyncStorage.setItem('@app:ekocampo', token);
    NavigationService.navigateReset();
    NavigationService.navigate('ListProduct');
};

const verifyPhoneApi = (phone) => {
    let body = {
        phone: phone
    };
    return fetch(`${verifyPhoneUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {
            if (json.code === 422)
                throw json.data;
            if (json.code === 400)
                throw json.data;
            if (json.hasOwnProperty('access_token'))
                return json.access_token;
            throw json.data;
        }).catch((error) => {
            throw error;
        })
};

function* verifyPhoneFlow(action) {
    try {
        const {phone} = action;
        const token = yield call(verifyPhoneApi, phone);
        yield put(phoneVerifySuccess());
        yield put(loginHiddenModal('validPhone'));
        yield put(loginSuccess());
        yield put(loginResetStates());
        yield put(checkJWTRequesting(token));
        yield put(setTokenStorage(token));
        NavigationService.goBack();
    } catch (error) {
        if (error.code === 400) {
            if (error.data === 'Telefono no registrado') {
                yield put(loginHiddenModal('validPhone'));
                NavigationService.navigate('Register', {verifyPhone: true});
            } else {
                yield put(handlerAlertModal('error', `Error al ingresar ${error.data}`));
            }
        }
        yield put(phoneVerifyError(error));
    }
}

function* phoneWatcher() {
    yield all([
        takeEvery(PHONE_VERIFY_REQUESTING, verifyPhoneFlow),
    ])
}

export default phoneWatcher;