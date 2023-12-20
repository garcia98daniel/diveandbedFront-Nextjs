import {
        TOGGLE_ROOMS_MODAL,
        
        GET_LODGING_REQUESTING,
        GET_LODGING_SUCCESS,
        GET_LODGING_ERROR,

        GET_POPULAR_ACTIVITIES_REQUESTING,
        GET_POPULAR_ACTIVITIES_SUCCESS,
        GET_POPULAR_ACTIVITIES_ERROR,

        LODGING_PAGE_RESET_STATE,
} from "./constants";

export const toggleRoomsModal = (bool) => ({
    type: TOGGLE_ROOMS_MODAL,
    bool
});


export const getLodgingRequesting = (lang, id) => ({
    type: GET_LODGING_REQUESTING,
    lang, id
});
export const getLodgingSuccess = (lodging) => ({
    type: GET_LODGING_SUCCESS,
    lodging
});
export const getLodgingError = (error) => ({
    type: GET_LODGING_ERROR,
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

export const lodgingPageResetState = () => ({
    type: LODGING_PAGE_RESET_STATE,
});