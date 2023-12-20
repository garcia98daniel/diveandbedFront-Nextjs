import {
    TOGGLE_FILTER_MODAL,

    GET_SUBCATEGORIES_REQUESTING,
    GET_SUBCATEGORIES_SUCCESS,
    GET_SUBCATEGORIES_ERROR,

    SET_DATA_RESULT,

    // GET_SEARCH_PAGE_POPULAR_ACTIVITIES_REQUESTING,
    // GET_SEARCH_PAGE_POPULAR_ACTIVITIES_SUCCESS,
    // GET_SEARCH_PAGE_POPULAR_ACTIVITIES_ERROR, 

    RESULT_RESET_STATE,
} from "./constants";


const initialState = {
    requesting: false,
    success: false,
    error: '',

    isOpen_filter_modal: false,
    result:[],
    subCategories:[],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FILTER_MODAL:
            return{
                ...state,
                isOpen_filter_modal: action.bool
            };

        case GET_SUBCATEGORIES_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_SUBCATEGORIES_SUCCESS:
            return{
                ...state,
                requesting: true,
                success: true,
                error:'',
                subCategories: action.subCategories
            };
        case GET_SUBCATEGORIES_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
            
            case SET_DATA_RESULT:
                return{
                    ...state,
                    result: action.result
                };

            // case GET_SEARCH_PAGE_POPULAR_ACTIVITIES_REQUESTING:
            //     return{
            //         ...state,
            //         requesting: true,
            //         success: false,
            //         error:'',
            //     };
            // case GET_SEARCH_PAGE_POPULAR_ACTIVITIES_SUCCESS:
            //     return{
            //         ...state,
            //         requesting: true,
            //         success: true,
            //         error:'',
            //         result: action.result
            //     };
            // case GET_SEARCH_PAGE_POPULAR_ACTIVITIES_ERROR:
            //     return{
            //         ...state,
            //         requesting: false,
            //         success: false,
            //         error: action.error,
            //     };
                
            case RESULT_RESET_STATE : 
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
