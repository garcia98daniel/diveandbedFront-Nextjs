import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {
    userGetError,
    userGetSuccess,
    userResetStates,
    userUpdateError, userUpdatePositionError,
    userUpdatePositionSuccess,
    userUpdateSuccess
} from "./actions";
import {USER_GET_REQUESTING, USER_UPDATE_POSITION_REQUESTING, USER_UPDATE_REQUESTING} from "./constants";
import {clientSet} from "../../client/actions";
// import {DropDownHolder} from "../../../../App";
// import {
//     handlerAlertModal,
// } from "../../generalsEffects/actions";
const meUrl = `${ROUTE_ENDPOINT}`;

const userGetApi = (token) => {
    return fetch(`${meUrl}/auth/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(json => {
            if (json.statusCode === 200){
                return json.data;
            }

            throw json;
        }).catch((error) => {
            console.log("erro json");
            throw error;
        })
};

function* userGetFlow(action) {
    try {
        const {token} = action;
        const user = yield call(userGetApi, token);
        // console.log(user)
        yield put(userGetSuccess(user));
        yield put(clientSet(token));
        yield put(userResetStates());
    } catch (error) {
        // console.log(error);
        yield put(userGetError(error));
    }
}

const userUpdateProfilePicApi = (token, values) => {
    let formData = new FormData();

    if (values?.alt_photo_url_profile?.length > 0){
        values.alt_photo_url_profile?.map((fileItem, index) => {
            // let file = {uri: fileItem.uri, name: fileItem.fileName, type: fileItem.type || 'image/jpeg'};
            // console.log(fileItem)
            formData.append(`profilePicture`, fileItem); //cambiar variable
        });
    }
    return fetch(`${meUrl}/users/profile-picture/upload`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Bearer ${token}`,
        },
        body: formData,

    })
        .then(response => {
                if(response.status === 500)
                throw "Error interno del servidor";
            return response.json();
        })
        .then(json => {
            if (json.statusCode === 200){
                return json;
            }

            throw json;
        }).catch((error) => {
            throw error;
        })
};


// }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

const userUpdateCoverPicApi = (token, values) => {
    let formData = new FormData();

    if (values?.cover_alt_photo_url_profile?.length > 0){
        values.cover_alt_photo_url_profile?.map((fileItem, index) => {
            // let file = {uri: fileItem.uri, name: fileItem.fileName, type: fileItem.type || 'image/jpeg'};
            // console.log(fileItem)
            formData.append(`frontPicture`, fileItem);//cambiar variable
        });
    }
    return fetch(`${meUrl}/users/front-picture/upload`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Bearer ${token}`,
        },
        body: formData,

    })
        .then(response => {
                if(response.status === 500)
                throw "Error interno del servidor";
            return response.json();
        })
        .then(json => {
            if (json.statusCode === 200){
                return json;
            }

            throw json;
        }).catch((error) => {
            throw error;
        })
};

function* userUpdateFlow(action) {
    try {
        const {token, values} = action;
        let user;
        // console.log(token, values);

        if(values?.alt_photo_url_profile?.length > 0){
             console.log(token, values);

            user = yield call(userUpdateProfilePicApi, token, values);
        }
        if(values?.cover_alt_photo_url_profile?.length > 0){
            user = yield call(userUpdateCoverPicApi, token, values);
        }
        yield put(userUpdateSuccess(user.data));
        // yield put(handlerAlertModal('success', 'Usuario actualizado con éxito.'));
        yield put(userResetStates());
    } catch (error) {
        // yield put(handlerAlertModal('error', `Ups! algo salió mal, ${error.message}`));
        yield put(userUpdateError(error));
    }
}

function* userWatcher() {
    yield all([
        takeEvery(USER_GET_REQUESTING, userGetFlow),
        takeEvery(USER_UPDATE_REQUESTING, userUpdateFlow),
    ])
}

export default userWatcher;
