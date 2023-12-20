import {
    TOGGLE_SIDE_MENU_MOBILE,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,
} from "./constants";


const initialState = {
    side_menu_mobile_isOpen: false,
    alertModal : {
        isOpen: false,
        type: "",
        message: "",
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDE_MENU_MOBILE:
            return{
                ...state,
                side_menu_mobile_isOpen: action.value 
            };
        case HANDLER_ALERT_MODAL : 
            return {
                ...state,
                alertModal : {
                    isOpen: true,
                    type: action.typeAlert,
                    message: action.message,
                },
            };
        case CLOSE_ALERT_MODAL : 
            return {
                ...state,
                alertModal : {
                    isOpen: false,
                    type: "",
                    message: "",
                },
            };
        default:
            return state;
    }
};

export default reducer;
