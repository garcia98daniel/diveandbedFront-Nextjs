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


const initialState = {
    requesting: false,
    success: false,
    error: '',

    isOpen_whatwouldyouliketodo_modal: false,
    values:{
        type:"diving",
        levelExperience:0,
        startDate:"",
        endDate:"",
        page:1,
        limit:20,
        pax:[
            {
                name:'',
                email:'',
                tel:'',
                experience:0,
                language:''
            }
        ],
        minPrice:0,
        maxPrice:0,
        sortBy:"recent",
        sortOrder:"asc",
        subCategory_id:"",
        zones:[],
        services:[],
        languages:[],
    },

    filterOptions:{
        zones: [
        
        ],
        services: [
          
        ],
        languages: [
        
        ]
    }

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_WHAT_WOULD_YOU_LIKE_TO_DO_MODAL:
            return{
                ...state,
                isOpen_whatwouldyouliketodo_modal: action.bool
            };

        case SEARCH_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case SEARCH_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                error:'',
            };
        case SEARCH_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
            
        case SEARCH_CHANGE_VALUES:
            return{
                ...state,
                values:{
                    ...state.values,
                    [action.key]: action.value
                }
            };
        case GET_FILTER_OPTIONS_REQUESTING:
            return{
                ...state,
                requesting: true,
                success: false,
                error:'',
            };
        case GET_FILTER_OPTIONS_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                error:'',
                filterOptions: action.options,
            };
        case GET_FILTER_OPTIONS_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                error: action.error,
            };
        case FILTER_ADD_ZONE:
            return{
                ...state, 
                values:{
                    ...state.values,
                    zones: [...state.values.zones, action.zone]
                }
            };
        case FILTER_DELETE_ZONE:
            return{
                ...state, 
                values:{
                    ...state.values,
                    zones: state.values.zones.filter(zone => zone !== action.zone)
                }
            };
        
        case FILTER_ADD_SERVICE:
            return{
                ...state, 
                values:{
                    ...state.values,
                    services: [...state.values.services, action.service]
                }
            };
        case FILTER_DELETE_SERVICE:
            return{
                ...state, 
                values:{
                    ...state.values,
                    services: state.values.services.filter(service => service !== action.service)
                }
            };

        case FILTER_ADD_LANGUAGE:
            return{
                ...state, 
                values:{
                    ...state.values,
                    languages: [...state.values.languages, action.language]
                }
            };
        case FILTER_DELETE_LANGUAGE:
            return{
                ...state, 
                values:{
                    ...state.values,
                    languages: state.values.languages.filter(language => language !== action.language)
                }
            };
        case FILTER_CLEAR:
            return{
                ...state,
                values:{
                    ...state.values,
                        zones:[],
                        services:[],
                        languages:[],
                }
            };

        case SEARCH_RESET_ZONES_SERVICE_LANGUAGE : 
            return {
                ...state,
                filterOptions:{
                    zones: [
                    
                    ],
                    services: [
                      
                    ],
                    languages: [
                    
                    ]
                }
            };

        case SEARCH_ADD_DIVER:
            return{
                ...state,
                values:{
                    ...state.values,
                    pax: [
                        ...state.values.pax, 
                        action.diver
                    ]
                }
            };

        case SEARCH_DELETE_DIVER:
            return{
                ...state,
                values:{
                    ...state.values,
                    pax: state.values.pax.slice(0, state.values.pax.length-1)
                }
            };

        case SEARCH_CHANGE_PAX_VALUES:
            // name, value, index
            return{
                ...state,
                values:{
                    ...state.values,
                    pax: state.values.pax.map((item, index)=>{
                        if(index === action.index){
                            return {
                                ...item,
                                [action.key]: action.value
                            }
                        }else{
                            return item;
                        }
                    })
                }
            };

        case SEARCH_RESET_STATE : 
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
