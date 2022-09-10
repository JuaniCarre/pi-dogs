import { AZ } from "../../constantes/sort";
import { FETCH_DOGS, SEARCH_DOGS, SORT, DETAIL_DOG, CLEAR} from "../actions";

const initialState= {
    dogs:[],
    filteredDogs:[],
    dogDetail:{}
}

export default function reducer(state=initialState, action) {

    switch(action.type) {
        case FETCH_DOGS:
            return {
                ...state, 
                dogs: action.payload,
                filteredDogs: action.payload
            }
            
        case DETAIL_DOG:
            return{
                ...state,
                dogDetail:action.payload
            }
        case SEARCH_DOGS:
            return {
                ...state, 
                filteredDogs: action.payload
            }
        
        case SORT:
            let orderedDogs = [...state.dogs]
            orderedDogs = state.dogs.sort((a,b)=>{
                if(a.name.toLowerCase()<b.name.toLowerCase()){
                    return action.payload === AZ ? -1 : 1;
                }
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return action.payload === AZ ? 1 : -1;
                }
            return 0
            })
            return{
                ...state, 
                filteredDogs: orderedDogs
            }

        case CLEAR:
            return{
                ...state,
                dogDetail:[]
            }
        default:
            return state
    }
}