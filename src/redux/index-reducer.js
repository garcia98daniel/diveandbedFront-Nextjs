import { combineReducers } from 'redux';
import loginReducer from './auth/login/reducer';
import clientReducer from './client/reducer';
import languageReducer from './language/reducer';
import userReducer from './auth/user/reducer';
import LogoutReducer from './auth/logout/reducer';
import forgotReducer from './auth/forgot/reducer';
import registerReducer from './auth/register/reducer';
import searchActivityReducer from './searchActivity/reducer';
import generalsEffectsReducer from './generalsEffects/reducer';
import homePageReducer from './homePage/reducer';
import centerPageReducer from './centerPage/reducer';
import lodgingPageReducer from './lodgingPage/reducer';
import zonePageReducer from './zonePage/reducer';
import searchPageReducer from './searchPage/reducer';
import servicePageReducer from './servicePage/reducer';
import reservationsPageReducer from './reservationsPage/reducer';
import checkOutServiceReducer from './checkOutService/reducer';
import checkOutLodgingReducer from './checkOutLodging/reducer';

export default combineReducers({
    loginReducer,
    clientReducer,
    languageReducer,
    userReducer,
    LogoutReducer,
    forgotReducer,
    registerReducer,
    searchActivityReducer,
    generalsEffectsReducer,
    homePageReducer,
    centerPageReducer,
    lodgingPageReducer,
    zonePageReducer,
    searchPageReducer,
    servicePageReducer,
    reservationsPageReducer,
    checkOutServiceReducer,
    checkOutLodgingReducer,
});