import {
    GET_CATEGORIES_REQUESTING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,

    GET_POPULAR_ACTIVITIES_REQUESTING,
    GET_POPULAR_ACTIVITIES_SUCCESS,
    GET_POPULAR_ACTIVITIES_ERROR,

    GET_POPULAR_LODGING_REQUESTING,
    GET_POPULAR_LODGING_SUCCESS,
    GET_POPULAR_LODGING_ERROR,

    GET_POPULAR_CENTERS_REQUESTING,
    GET_POPULAR_CENTERS_SUCCESS,
    GET_POPULAR_CENTERS_ERROR,

    HOME_PAGE_RESET_STATE
} from "./constants";


const initialState = {
    requesting: false,
    success: false,
    error: '',

    categories: [],

    popular_activities:[],
    places_to_relax: [],
    // top_certifications: [],
    // dream_destinations: [],
    best_centers: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case GET_CATEGORIES_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                categories: action.categories
            };

        case GET_CATEGORIES_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
        case GET_POPULAR_ACTIVITIES_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case GET_POPULAR_ACTIVITIES_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                popular_activities: action.popular_activities
            };

        case GET_POPULAR_ACTIVITIES_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };

        case GET_POPULAR_LODGING_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case GET_POPULAR_LODGING_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                places_to_relax: action.popular_lodging
            };

        case GET_POPULAR_LODGING_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
            
        case GET_POPULAR_CENTERS_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case GET_POPULAR_CENTERS_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                best_centers: action.best_centers
            };

        case GET_POPULAR_CENTERS_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };

        case HOME_PAGE_RESET_STATE:
            return{
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
