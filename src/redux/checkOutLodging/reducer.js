import {
    CREATE_CHECK_OUT_LODGING_RESERVATION_REQUESTING,
    CREATE_CHECK_OUT_LODGING_RESERVATION_SUCCESS,
    CREATE_CHECK_OUT_LODGING_RESERVATION_ERROR,

    CHECK_OUT_LODGING_CHANGE_VALUES,
    CHECK_OUT_LODGING_TOGGLE_MODAL,
    CHECK_OUT_LODGING_RESET_STATE,
} from "./constants";


const initialState = {

    requesting: false,
    success: false,
    error:'',
    lodgingCheckOutCardModal_isOpen:false,

    values:{
        lodging_id:'',
        lodging_name:'',
        lodging_rate:'',
        lodging_img:'',
        room_selected:'',
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CHECK_OUT_LODGING_RESERVATION_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case CREATE_CHECK_OUT_LODGING_RESERVATION_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                error:'',
            };
        case CREATE_CHECK_OUT_LODGING_RESERVATION_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };

        case CHECK_OUT_LODGING_CHANGE_VALUES:
            return{
                ...state,
                values: {...state.values, [action.key]: action.value}
            };

        case CHECK_OUT_LODGING_TOGGLE_MODAL:
            return{
                ...state,
                lodgingCheckOutCardModal_isOpen: action.bool
            };


        case CHECK_OUT_LODGING_RESET_STATE : 
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
