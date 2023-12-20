import {

    TOGGLE_FILTER_MODAL,

    GET_SUBCATEGORIES_REQUESTING,
    GET_SUBCATEGORIES_SUCCESS,
    GET_SUBCATEGORIES_ERROR,

    SET_DATA_RESULT,

    GET_SEARCH_PAGE_POPULAR_ACTIVITIES_REQUESTING,
    GET_SEARCH_PAGE_POPULAR_ACTIVITIES_SUCCESS,
    GET_SEARCH_PAGE_POPULAR_ACTIVITIES_ERROR, 

    RESULT_RESET_STATE,
} from "./constants";


export const toggleFilterModal = (bool) => ({
    type: TOGGLE_FILTER_MODAL,
    bool
});


export const getSubcategoriesRequesting = () => ({
    type: GET_SUBCATEGORIES_REQUESTING,
    
});
export const getSubcategoriesSuccess = (subCategories) => ({
    type: GET_SUBCATEGORIES_SUCCESS,
    subCategories
});
export const getSubcategoriesError = (error) => ({
    type: GET_SUBCATEGORIES_ERROR,
    error
});

export const search_page_getPopularActivitiesRequesting = (language) => ({
    type: GET_SEARCH_PAGE_POPULAR_ACTIVITIES_REQUESTING,
    language
});
export const search_page_getPopularActivitiesSuccess = (popular_activities) => ({
    type: GET_SEARCH_PAGE_POPULAR_ACTIVITIES_SUCCESS,
    popular_activities
});
export const search_page_getPopularActivitiesError = (error) => ({
    type: GET_SEARCH_PAGE_POPULAR_ACTIVITIES_ERROR,
    error
});


export const setDataResult = (result) => ({
    type: SET_DATA_RESULT,
    result
});


export const resultResetState = () => ({
    type: RESULT_RESET_STATE,
});