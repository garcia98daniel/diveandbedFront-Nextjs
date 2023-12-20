import {call, all, put, takeEvery} from 'redux-saga/effects';
import { push } from 'react-router-redux';  
import {ROUTE_ENDPOINT} from "../../../utils/route";
// import {DropDownHolder} from "../../../../App";
import {
    forgotCleanForm,
    forgotResetStates,
    resetPasswordSuccess,
    sendEmailError,
    sendEmailSuccess,
    sendTokenSuccess,
    forgotResetAllStates
} from "./actions";
import {RESET_PASSWORD_REQUESTING, SEND_EMAIL_REQUESTING, SEND_TOKEN_REQUESTING} from "./constants";
// import NavigationService from "../../../utils/NavigationService";
// import {handlerAlertModal} from "../../menusModals/actions";

const forgotUrl = `${ROUTE_ENDPOINT}`;

const sendEmailApi = (values) => {
    let body = {
        email: values.email,
    };
    return fetch(`${forgotUrl}/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if(response.status === 500){
                console.log("Error interno del servidor")
            }
            return response.json()
        })
        .then(json => {
            if (json.hasOwnProperty("error")){
                throw json;
            }

                return true;

            throw json
        }).catch((error) => {
            throw error;
        })
};

function* sendEmailFlow(action) {
    try {
        const {values} = action;
        yield call(sendEmailApi, values);
        yield put(sendEmailSuccess());
        yield put(forgotResetStates());
        // yield put(handlerAlertModal('success', `Correo electrónico enviado, Se ha enviado un correo con un token a ${values.email}`));
    } catch (error) {
        yield put(sendEmailError(error));
        // if (error.code === 400) {
        //     yield put(handlerAlertModal('error',  error.data));
        //     yield put(sendEmailError(error));
        // } else {
        //     yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
        //     yield put(sendEmailError(error));
        // }
    }
}

// const sendTokenApi = (values) => {
//     let body = {
//         token: values.token,
//     };
//     return fetch(`${forgotUrl}VerifyToken`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)
//     })
//         .then(response => response.json())
//         .then(json => {
//             if (json.code === 422)
//                 throw json.data;
//             if (json.code === 400)
//                 throw json.data;
//             if (json.code === 200)
//                 return true;
//             throw ''
//         }).catch((error) => {
//             throw error;
//         })
// };

// function* sendTokenFlow(action) {
//     try {
//         const {values} = action;
//         yield call(sendTokenApi, values);
//         yield put(sendTokenSuccess());
//         yield put(forgotResetStates());
//     } catch (error) {
//         if (error.code === 400) {
//             yield put(handlerAlertModal('error',  error.data));
//             yield put(sendEmailError(error));
//         } else {
//             yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
//             yield put(sendEmailError(error));
//         }
//     }
// }

// const resetPasswordApi = (values) => {
//     let body = {
//         token: values.token,
//         password: values.password,
//         password_confirmation: values.rePassword,
//     };
//     return fetch(`${forgotUrl}ResetPassword`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)
//     })
//         .then(response => response.json())
//         .then(json => {
//             if (json.code === 422)
//                 throw json.data;
//             if (json.code === 400)
//                 throw json.data;
//             if (json.code === 200)
//                 return true;
//             throw ''
//         }).catch((error) => {
//             throw error;
//         })
// };

// function* resetPasswordFlow(action) {
//     try {
//         const {values} = action;
//         yield call(resetPasswordApi, values);
//         yield put(resetPasswordSuccess());
//         yield put(forgotResetStates());
//         yield put(forgotCleanForm());
//         yield put(forgotResetAllStates());
        
//         yield put(handlerAlertModal('success', 'Contraseña restablecida', 'La contraseña fue restablecida con éxito.'));
//         yield put(push('/signIn'));

//         // NavigationService.navigate('Login');
//     } catch (error) {
//         if (error.code === 400) {
//             yield put(handlerAlertModal('error', error.data));
//             yield put(sendEmailError(error));
//         } else {
//             yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
//             yield put(sendEmailError(error));
//         }
//     }
// }

function* forgotWatcher() {
    yield all([
        takeEvery(SEND_EMAIL_REQUESTING, sendEmailFlow),
        // takeEvery(SEND_TOKEN_REQUESTING, sendTokenFlow),
        // takeEvery(RESET_PASSWORD_REQUESTING, resetPasswordFlow),
    ])
}

export default forgotWatcher;
