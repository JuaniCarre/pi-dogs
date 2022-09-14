import { AZ, Light } from "../../constantes/sort";
import { FETCH_DOGS, SEARCH_DOGS, SORT, DETAIL_DOG, CLEAR, TEMPERAMENTS, SORTBYWEIGHT, FILTEREDBYTEMPS} from "../actions";

const initialState= {
    dogs:[],
    filteredDogs:[],
    dogDetail:{},
    temperaments:[]
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
            let orderedDogs = [...state.filteredDogs]
            orderedDogs = state.filteredDogs.sort((a,b)=>{
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

        case SORTBYWEIGHT:
            let orderedWeightDogs = 
            action.payload === Light? state.filteredDogs.sort(function (a, b) {
                if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                return 0;
                })
                    : state.filteredDogs.sort(function (a, b) {
                if (parseInt(a.weight) < parseInt(b.weight)) return 1;
                if (parseInt(a.weight) > parseInt(b.weight)) return -1;
                return 0});
                console.log(orderedWeightDogs)
            return{
                ...state,
                filteredDogs: orderedWeightDogs
        }

        case FILTEREDBYTEMPS:
            let orderByTemp = []
            console.log(state.dogs)
            for (let i = 0; i < state.dogs.length; i++) {
                if(state.dogs[i].temperament){
                    if(state.dogs[i].temperament.includes(action.payload)){
                        orderByTemp.push(state.dogs[i])
                    }
                } else if (state.dogs[i].temperaments){
                    for (var j = 0; j < state.dogs[i].temperaments.length; j++){
                        if(state.dogs[i].temperaments[j].name === action.payload){
                            orderByTemp.push(state.dogs[i])
                        }
                    }
                }
            } 
            
            return{
                ...state,
                filteredDogs: orderByTemp,
                
            }

        case TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
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