import { FETCH_DOGS } from "../actions";

const initialState= {
    dogs:[],
    filteredDogs:[],
}

export default function reducer(state=initialState, action) {

    switch(action.type) {
        case FETCH_DOGS:
            return {
                ...state, 
                dogs: action.payload.data
            }
            default:
                return state
    }
}