import {PHONE_VERIFY_ERROR, PHONE_VERIFY_REQUESTING, PHONE_VERIFY_SUCCESS} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PHONE_VERIFY_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case PHONE_VERIFY_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
            };
        case PHONE_VERIFY_ERROR:
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