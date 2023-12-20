import {
    USER_CHANGE_FORM,
    USER_GET_ERROR,
    USER_GET_REQUESTING,
    USER_GET_SUCCESS,
    USER_RESET_STATES, USER_RESET_STATES_LOGOUT,
    USER_UPDATE_ERROR,
    USER_UPDATE_REQUESTING,
    USER_UPDATE_SUCCESS,
    USER_MODAL_PHOTOS_TOGGLE
} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',
    user: {},
    profilePhotosModal: false,
    values: {
        _id:'',
        role: '',
        email: '',
        name: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case USER_GET_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                user: {
                    ...state.user,
                    ...action.user
                },
                values: {
                    ...state.user,
                    role: action.user.role,
                    email: action.user.email,
                    name: action.user.name,
                },
            };
        case USER_GET_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
        case USER_UPDATE_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                user: action.user,
                values: {
                    _id: action.user._id,
                    role: action.user.role,
                    email: action.user.email,
                    name: action.user.name,
                },
            };
        case USER_UPDATE_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
        case USER_CHANGE_FORM:
            return {
                ...state,
                values: {...state.values, [action.key]: action.value},
            };
        case USER_MODAL_PHOTOS_TOGGLE:
            return {
                ...state,
                profilePhotosModal: action.bool,
            };
        case USER_RESET_STATES:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
                values: {
                    _id: state.user.hasOwnProperty('_id') ? state.values._id : '',
                    role: state.user.hasOwnProperty('role') ? state.values.role : '',
                    email: state.user.hasOwnProperty('email') ? state.values.email : '',
                    name: state.user.hasOwnProperty('name') ? state.values.name : '',
                },
            };
        case USER_RESET_STATES_LOGOUT:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
                user: {},
                profilePhotosModal: false,
                values: {
                    _id:'',
                    role: '',
                    email: '',
                    name: '',
                },
            };
        default:
            return state;
    }
};

export default reducer;
