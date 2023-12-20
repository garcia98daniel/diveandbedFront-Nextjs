import {
    LOGIN_CHANGE_FORM,
    LOGIN_ERROR, 
    LOGIN_REQUESTING, LOGIN_RESET_STATES, LOGIN_SHOW_HIDDEN_MODAL,
    LOGIN_SUCCESS
} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',
    values: {
        email: '',
        password: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
       
        case LOGIN_CHANGE_FORM:
            return {
                ...state,
                values: {...state.values, [action.key]: action.value}
            };
        case LOGIN_RESET_STATES:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
                values: {
                    email: '',
                    password: '',
                },
            };
                default:
        return state;
    }
};

export default reducer;