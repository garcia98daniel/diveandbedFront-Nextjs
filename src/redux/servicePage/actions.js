import {

    
    GET_SERVICE_REQUESTING,
    GET_SERVICE_SUCCESS,
    GET_SERVICE_ERROR,
    
    SERVICE_PAGE_GET_POPULAR_ACTIVITIES_REQUESTING,
    SERVICE_PAGE_GET_POPULAR_ACTIVITIES_SUCCESS,
    SERVICE_PAGE_GET_POPULAR_ACTIVITIES_ERROR,

    SERVICE_PAGE_GET_POPULAR_LODGING_REQUESTING,
    SERVICE_PAGE_GET_POPULAR_LODGING_SUCCESS,
    SERVICE_PAGE_GET_POPULAR_LODGING_ERROR,

    SERVICE_PAGE_GET_QUESTIONS_REQUESTING,
    SERVICE_PAGE_GET_QUESTIONS_SUCCESS,
    SERVICE_PAGE_GET_QUESTIONS_ERROR,

    SERVICE_PAGE_CHANGE_POST_QUESTION,

    SERVICE_PAGE_POST_QUESTION_REQUESTING,
    SERVICE_PAGE_POST_QUESTION_SUCCESS,
    SERVICE_PAGE_POST_QUESTION_ERROR,
    
    SERVICE_PAGE_RESET_STATE,
} from "./constants";


export const getServiceRequesting = (lang, id) => ({
    type: GET_SERVICE_REQUESTING,
    lang, id
});
export const getServiceSuccess = (service) => ({
    type: GET_SERVICE_SUCCESS,
    service
});
export const getServiceError = (error) => ({
    type: GET_SERVICE_ERROR,
    error
});


export const servicePage_getPopularActivitiesRequesting = (language) => ({
    type: SERVICE_PAGE_GET_POPULAR_ACTIVITIES_REQUESTING,
    language
});

export const servicePage_getPopularActivitiesSuccess = (popular_activities) => ({
    type: SERVICE_PAGE_GET_POPULAR_ACTIVITIES_SUCCESS,
    popular_activities
});

export const servicePage_getPopularActivitiesError = (error) => ({
    type: SERVICE_PAGE_GET_POPULAR_ACTIVITIES_ERROR,
    error
});


export const servicePage_getPopularLodgingRequesting = (language) => ({
    type: SERVICE_PAGE_GET_POPULAR_LODGING_REQUESTING,
    language
});
export const servicePage_getPopularLodgingSuccess = (popular_lodging) => ({
    type: SERVICE_PAGE_GET_POPULAR_LODGING_SUCCESS,
    popular_lodging
});
export const servicePage_getPopularLodgingError = (error) => ({
    type: SERVICE_PAGE_GET_POPULAR_LODGING_ERROR,
    error
});


export const servicePage_getQuestionsRequesting = (service_id) => ({
    type: SERVICE_PAGE_GET_QUESTIONS_REQUESTING,
    service_id
});
export const servicePage_getQuestionsSuccess = (questions) => ({
    type: SERVICE_PAGE_GET_QUESTIONS_SUCCESS,
    questions
});
export const servicePage_getQuestionsError = (error) => ({
    type: SERVICE_PAGE_GET_QUESTIONS_ERROR,
    error
});


export const servicePage_changePostQuestion = (value) => ({
    type: SERVICE_PAGE_CHANGE_POST_QUESTION,
    value
});



export const servicePage_postQuestionRequesting = (service_id, question, token) => ({
    type: SERVICE_PAGE_POST_QUESTION_REQUESTING,
    service_id, question, token
});
export const servicePage_postQuestionSuccess = (question) => ({
    type: SERVICE_PAGE_POST_QUESTION_SUCCESS,
    question
});
export const servicePage_postQuestionError = (error) => ({
    type: SERVICE_PAGE_POST_QUESTION_ERROR,
    error
});


export const servicePageResetState = () => ({
    type: SERVICE_PAGE_RESET_STATE,
});