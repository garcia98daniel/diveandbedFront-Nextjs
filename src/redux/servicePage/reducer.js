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


const initialState = {

    requesting: false,
    success: false,
    error:'',
    popular_activities:[],
    lodging:[],
    questions:[],
    post_opinion_value:'',
    post_question_value:'',

    service:{
        _id: '',
        name: '',
        slug: '',
        description: '',
        category: '',
        subCategory: '',
        price: 0,
        promotionalPrice: 0,
        pricePerGroup: 0,
        currency: '',
        duration: '',
        schedule: [
          {
            day: '',
            hourStart: '',
            _id: ''
          },
        ],
        diveZones: [
          '',
        ],
        center: '',
        requirements: [
          '',
        ],
        includes: [
          '',
        ],
        notIncludes: [
          '',
        ],
        itineraries: [],
        frontImage: '',
        images: [
          '',
        ],
        languages: [
          '',
        ],
        tags: [
          '',
        ],
        publicationLanguage: '',
        notAvailableDates: [],
        whatExpect: '',
        avgRating: '',
        totalRatings: 0,
        totalBookings: 0,
        totalViews: 0,
        totalQuestions: 0,
        levelExperience: 0,
        createdAt: '',
        updatedAt: '',
        __v: 0
      }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVICE_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_SERVICE_SUCCESS:
            return{
                ...state,
                requesting: true,
                success: true,
                error:'',
                service: action.service
            };
        case GET_SERVICE_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };

        case SERVICE_PAGE_GET_POPULAR_ACTIVITIES_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case SERVICE_PAGE_GET_POPULAR_ACTIVITIES_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                popular_activities: action.popular_activities
            };

        case SERVICE_PAGE_GET_POPULAR_ACTIVITIES_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };



        case SERVICE_PAGE_GET_POPULAR_LODGING_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case SERVICE_PAGE_GET_POPULAR_LODGING_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                lodging: action.popular_lodging
            };

        case SERVICE_PAGE_GET_POPULAR_LODGING_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };



        case SERVICE_PAGE_GET_QUESTIONS_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case SERVICE_PAGE_GET_QUESTIONS_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                questions: action.questions
            };

        case SERVICE_PAGE_GET_QUESTIONS_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
            
            
        case SERVICE_PAGE_CHANGE_POST_QUESTION:
            return{
                ...state,
                post_question_value:action.value
            };



        case SERVICE_PAGE_POST_QUESTION_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error: '',
            };

        case SERVICE_PAGE_POST_QUESTION_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                questions: [
                    ...state.questions,
                    action.question
                ]
            };

        case SERVICE_PAGE_POST_QUESTION_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };


        case SERVICE_PAGE_RESET_STATE : 
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
