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

    HOME_PAGE_RESET_STATE,
} from "./constants";


export const getCategoriesRequesting = () => ({
    type: GET_CATEGORIES_REQUESTING,
    
});
export const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    categories
});
export const getCategoriesError = (error) => ({
    type: GET_CATEGORIES_ERROR,
    error
});


export const getPopularActivitiesRequesting = (language) => ({
    type: GET_POPULAR_ACTIVITIES_REQUESTING,
    language
});
export const getPopularActivitiesSuccess = (popular_activities) => ({
    type: GET_POPULAR_ACTIVITIES_SUCCESS,
    popular_activities
});
export const getPopularActivitiesError = (error) => ({
    type: GET_POPULAR_ACTIVITIES_ERROR,
    error
});


export const getPopularLodgingRequesting = (language) => ({
    type: GET_POPULAR_LODGING_REQUESTING,
    language
});
export const getPopularLodgingSuccess = (popular_lodging) => ({
    type: GET_POPULAR_LODGING_SUCCESS,
    popular_lodging
});
export const getPopularLodgingError = (error) => ({
    type: GET_POPULAR_LODGING_ERROR,
    error
});


export const getPopularCentersRequesting = (language) => ({
    type: GET_POPULAR_CENTERS_REQUESTING,
    language
});
export const getPopularCentersSuccess = (best_centers) => ({
    type: GET_POPULAR_CENTERS_SUCCESS,
    best_centers
});
export const getPopularCentersError = (error) => ({
    type: GET_POPULAR_CENTERS_ERROR,
    error
});


export const homePageResetState = () => ({
    type: HOME_PAGE_RESET_STATE,
});
