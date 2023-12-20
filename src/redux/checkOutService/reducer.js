import {

    
    CREATE_CHECK_OUT_SERVICE_RESERVATION_REQUESTING,
    CREATE_CHECK_OUT_SERVICE_RESERVATION_SUCCESS,
    CREATE_CHECK_OUT_SERVICE_RESERVATION_ERROR,

    CHECK_OUT_SERVICE_CHANGE_VALUES,

    CHECK_OUT_SERVICE_TOGGLE_MODAL,
    
    CHECK_OUT_SERVICE_RESET_STATE,
} from "./constants";


const initialState = {

    requesting: false,
    success: false,
    error:'',
    serviceCheckOutCardModal_isOpen:false,

    values:{
        service_id:'',
        service_name:'',
        service_rate:'',
        service_img:'',
        price_per_pax:0,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CHECK_OUT_SERVICE_RESERVATION_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case CREATE_CHECK_OUT_SERVICE_RESERVATION_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                error:'',
            };
        case CREATE_CHECK_OUT_SERVICE_RESERVATION_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };

        case CHECK_OUT_SERVICE_CHANGE_VALUES:
            return{
                ...state,
                values: {...state.values, [action.key]: action.value}
            };

        case CHECK_OUT_SERVICE_TOGGLE_MODAL:
            return{
                ...state,
                serviceCheckOutCardModal_isOpen: action.bool
            };


        case CHECK_OUT_SERVICE_RESET_STATE : 
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
