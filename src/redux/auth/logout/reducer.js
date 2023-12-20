import {LOGOUT_ERROR, LOGOUT_REQUESTING, LOGOUT_SUCCESS} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;