import {
    TOGGLE_SIDE_MENU_MOBILE,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,
} from "./constants";


export const toggleSideMenuMobile = (value) => ({
    type: TOGGLE_SIDE_MENU_MOBILE,
    value
});

export const handlerAlertModal = (typeAlert, message) => ({
        type : HANDLER_ALERT_MODAL,
        typeAlert, message
});

export const closeAlertModal = () => ({
        type : CLOSE_ALERT_MODAL,
});
