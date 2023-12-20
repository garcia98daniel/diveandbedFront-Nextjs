import {
    REGISTER_CHANGE_FORM,
    REGISTER_CLEAN_FORM,
    REGISTER_ERROR,
    REGISTER_REQUESTING,
    REGISTER_SUCCESS,
    REGISTER_RESET_STATE
} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',
    values: {
        name: '',
        email: '',
        password: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
        
        case REGISTER_CHANGE_FORM:
            return {
                ...state,
                values: {...state.values, [action.key]: action.value}
            };
        case REGISTER_CLEAN_FORM:
            return {
                ...state,
                success: false,
                values: {
                    name: '',
                    email: '',
                    password: '',
                },
            };
        case REGISTER_RESET_STATE:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
            };
        default:
            return state;
    }
};

export default reducer;