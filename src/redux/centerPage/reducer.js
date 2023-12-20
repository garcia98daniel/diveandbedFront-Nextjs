import {
    GET_CENTER_REQUESTING,
    GET_CENTER_SUCCESS,
    GET_CENTER_ERROR,

    CENTER_PAGE_RESET_STATE,
} from "./constants";


const initialState = {

    requesting: false,
    success: false,
    error:'',

    center:{
        slug: '',
        name: '',
        description: '',
        yearsOfExperience: 0,
        address: '',
        certificates: [],
        equipment: [],
        reservationPolicy: '',
        cancellationPolicy: '',
        languages: [],
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
        representative: {
          name: '',
          phone: ''
        },
        logo: '',
        frontImage: '',
        images: [],
        publicationLanguage: '',
        avgRating: 0,
        totalRatings: 0,
        totalViews: 0,
        certifiedPersonnel: 0
      }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CENTER_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_CENTER_SUCCESS:
            return{
                ...state,
                requesting: true,
                success: true,
                error:'',
                center: action.center
            };
        case GET_CENTER_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
        case CENTER_PAGE_RESET_STATE : 
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
