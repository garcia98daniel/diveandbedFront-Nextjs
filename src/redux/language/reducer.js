import {
    SET_LANGUAGE,
} from "./constants";


const initialState = {
    language: "es",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANGUAGE : 
            return {
                ...state,
                language: action.language
            };
        default:
            return state;
    }
};

export default reducer;
