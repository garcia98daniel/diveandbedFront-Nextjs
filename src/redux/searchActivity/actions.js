import {

    TOGGLE_WHAT_WOULD_YOU_LIKE_TO_DO_MODAL,

    SEARCH_REQUESTING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,

    SEARCH_CHANGE_VALUES,

    GET_FILTER_OPTIONS_REQUESTING,
    GET_FILTER_OPTIONS_SUCCESS,
    GET_FILTER_OPTIONS_ERROR,

    FILTER_ADD_ZONE,
    FILTER_DELETE_ZONE,

    FILTER_ADD_SERVICE,
    FILTER_DELETE_SERVICE,

    FILTER_ADD_LANGUAGE,
    FILTER_DELETE_LANGUAGE,

    FILTER_CLEAR,
    
    SEARCH_RESET_ZONES_SERVICE_LANGUAGE,

    SEARCH_ADD_DIVER,

    SEARCH_DELETE_DIVER,
    
    SEARCH_CHANGE_PAX_VALUES,
    
    SEARCH_RESET_STATE,
} from "./constants";


export const toggleWhatWouldYouLikeTodoModal = (bool) => ({
    type: TOGGLE_WHAT_WOULD_YOU_LIKE_TO_DO_MODAL,
    bool
});


export const searchRequesting = (values, language) => ({
    type: SEARCH_REQUESTING,
    values, language
});
export const searchSuccess = () => ({
    type: SEARCH_SUCCESS
});
export const searchError = (error) => ({
    type: SEARCH_ERROR,
    error
});



export const searchChangeValues = (key, value) => ({
    type: SEARCH_CHANGE_VALUES,
    key, value
});



// getFilterOptions
export const getFilterOptionsRequesting = (values) => ({
    type: GET_FILTER_OPTIONS_REQUESTING,
    values
});
export const getFilterOptionsSuccess = (options) => ({
    type: GET_FILTER_OPTIONS_SUCCESS,
    options
});
export const getFilterOptionsError = (error) => ({
    type: GET_FILTER_OPTIONS_ERROR,
    error
});



export const filterAddZone = (zone) => ({
    type: FILTER_ADD_ZONE,
    zone
});
export const filterDeleteZone = (zone) => ({
    type: FILTER_DELETE_ZONE,
    zone
});

export const filterAddService = (service) => ({
    type: FILTER_ADD_SERVICE,
    service
});
export const filterDeleteService = (service) => ({
    type: FILTER_DELETE_SERVICE,
    service
});


export const filterAddLanguage = (language) => ({
    type: FILTER_ADD_LANGUAGE,
    language
});
export const filterDeleteLanguage = (language) => ({
    type: FILTER_DELETE_LANGUAGE,
    language
});
export const filterClear = () => ({
    type: FILTER_CLEAR,
});



export const searchResetZonesServicesLanguage = () => ({
    type: SEARCH_RESET_ZONES_SERVICE_LANGUAGE,
});

export const searchAddDiver = (diver) => ({
    type: SEARCH_ADD_DIVER,
    diver
});

export const searchDeleteDiver = () => ({
    type: SEARCH_DELETE_DIVER,
});

export const searchChangePaxValues = (key, value, index) => ({
    type: SEARCH_CHANGE_PAX_VALUES,
    key, value, index
});


export const searchResetState = () => ({
    type: SEARCH_RESET_STATE,
});