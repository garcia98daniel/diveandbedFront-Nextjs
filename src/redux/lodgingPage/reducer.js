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


const initialState = {

    requesting: false,
    success: false,
    error:'',
    popular_activities:[],

    isOpen_rooms_modal:false,

    lodging:{
        slug: '',
        name: '',
        description: '',
        type: '',
        services: [],
        reservationPolicy: '',
        cancellationPolicy: '',
        location: {
          address: '',
          coordinates: [],
        },
        contact: '',
        representative: '',
        logo: '',
        frontImage: '',
        images: [],
        rooms: [],
        publicationLanguage: '',
        avgRating: 0,
        totalViews: 0,
        totalBookings: 0,
        totalReviews: 0,

        price: 0,
        contact: {
            email: '',
            phone: '',
            whatsapp: '',
            website: '',
            facebook: '',
            instagram: ''
        },
            socialMedia: {
            facebook: '',
            instagram: ''
        },
      }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ROOMS_MODAL:
            return{
                ...state,
                isOpen_rooms_modal: action.bool
            };
        case GET_LODGING_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_LODGING_SUCCESS:
            return{
                ...state,
                requesting: true,
                success: true,
                error:'',
                lodging: action.lodging
            };
        case GET_LODGING_ERROR:
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

        case LODGING_PAGE_RESET_STATE : 
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
