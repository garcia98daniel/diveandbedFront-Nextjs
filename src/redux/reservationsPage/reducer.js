import {
    GET_RESERVATIONS_REQUESTING,
    GET_RESERVATIONS_SUCCESS,
    GET_RESERVATIONS_ERROR,
    RESERVATIONS_PAGE_RESET_STATE,
} from "./constants";


const initialState = {

    requesting: false,
    success: false,
    error:'',
    reservations:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESERVATIONS_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_RESERVATIONS_SUCCESS:
            return{
                ...state,
                requesting: true,
                success: true,
                error:'',
                reservations: action.reservations
            };
        case GET_RESERVATIONS_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
        case RESERVATIONS_PAGE_RESET_STATE : 
            return {
                ...state,
                requesting: false,
                success: false,
                error:'',
            };
        default:
            return state;
    }
};

export default reducer;
