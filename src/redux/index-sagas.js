import {all, fork} from 'redux-saga/effects';
//
import loginSagas from './auth/login/sagas';
import registerSagas from './auth/register/sagas';
import logoutSagas from './auth/logout/sagas';
import forgotSagas from './auth/forgot/sagas';
import userSagas from './auth/user/sagas';
import languageSagas from './language/sagas';
import searchActivitySagas from './searchActivity/sagas';
import generalsEffectsSagas from './generalsEffects/sagas';   
import homePageSagas from './homePage/sagas';   
import centerPageSagas from './centerPage/sagas';   
import lodgingPageSagas from './lodgingPage/sagas';   
import zonePageSagas from './zonePage/sagas';   
import searchPageSagas from './searchPage/sagas';   
import servicePageSagas from './servicePage/sagas'; 
import reservationsPageSagas from './reservationsPage/sagas'; 

import checkOutServiceSagas from './checkOutService/sagas';   
import checkOutLodgingSagas from './checkOutLodging/sagas';   

function* IndexSagas() {
    yield all([
        fork(loginSagas),
        fork(logoutSagas),
        fork(registerSagas),
        fork(userSagas),
        fork(languageSagas),
        fork(forgotSagas),
        fork(searchActivitySagas),
        fork(generalsEffectsSagas),
        fork(homePageSagas),
        fork(centerPageSagas),
        fork(lodgingPageSagas),
        fork(zonePageSagas),
        fork(searchPageSagas),
        fork(servicePageSagas),
        fork(reservationsPageSagas),

        fork(checkOutServiceSagas),
        fork(checkOutLodgingSagas),
    ]);
}
export default IndexSagas