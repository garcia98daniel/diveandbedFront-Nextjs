// import {ROUTE_ENDPOINT} from "../../utils/route";
// import {call, all, put, takeEvery} from 'redux-saga/effects';
// import {checkJWTError, clientSet} from "./actions";
// import {CHECK_JWT_REQUESTING} from "./constants";
// import {userGetRequesting} from "../auth/user/actions";
// import AsyncStorage from "@react-native-community/async-storage";
// import {handlerAlertModal} from "../menusModals/actions";


// const removeTokenStorage = () => {
//     AsyncStorage.removeItem('@app:ekocampo');
// };

// const verifyUrl = `${ROUTE_ENDPOINT}/verifyUser`;

// const checkJWTAPI = (token) => {
//     return fetch(verifyUrl, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     })
//         .then(response => response.json())
//         .then(json => {
//             if (json.code === 400)
//                 throw json.data.data;
//             if (json.code === 200)
//                 return true;
//         }).catch((error) => {
//             throw error;
//         })
// };

// function* checkJWTFlow(action) {
//     try {
//         const {token} = action;
//         yield call(checkJWTAPI, token);
//         yield put(clientSet(token));
//         yield put(userGetRequesting(token));
//     } catch (error) {
//         yield call(removeTokenStorage);
//         yield put(checkJWTError(error));
//     }
// }

function* clientWatcher() {
    yield all([
        // takeEvery(CHECK_JWT_REQUESTING, checkJWTFlow),
    ])
}

export default clientWatcher;
