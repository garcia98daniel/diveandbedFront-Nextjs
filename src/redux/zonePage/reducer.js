import {
    GET_ZONE_REQUESTING,
    GET_ZONE_SUCCESS,
    GET_ZONE_ERROR,

    ZONE_PAGE_RESET_STATE,
} from "./constants";


const initialState = {

    requesting: false,
    success: false,
    error:'',
    zone:{}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ZONE_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_ZONE_SUCCESS:
            return{
                ...state,
                requesting: true,
                success: true,
                error:'',
                zone: action.zone
            };
        case GET_ZONE_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };

        case ZONE_PAGE_RESET_STATE : 
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
