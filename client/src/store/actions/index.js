import axios from 'axios';
export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SORT = 'SORT'
export const DETAIL_DOG = 'DETAIL_DOG'
export const CLEAR = 'CLEAR'
export const TEMPERAMENTS = 'TEMPERAMENTS'
export const SORTBYWEIGHT = "SORTBYWEIGHT"
export const FILTEREDBYTEMPS = "FILTEREDBYTEMPS"

export function fetchDogs() {
    return function (dispatch){
        axios.get('http://localhost:3001/dogs')
        .then((dogs) => {
            dispatch({
                type:FETCH_DOGS,
                payload: dogs.data,
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}

export function searchDogs(name){
    return function (dispatch){
        axios.get('http://localhost:3001/dogs/search/name?name=' + name)
        .then((dogs) => {
            dispatch({
                type: SEARCH_DOGS,
                payload: dogs.data,
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}


export function getDogById(id){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs/' + id)
        .then((dogs)=>{
            dispatch({
                type: DETAIL_DOG,
                payload: dogs.data,
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let res = await axios.get('http://localhost:3001/temperaments')
            return dispatch({
                type: TEMPERAMENTS,
                payload: res.data
    })
}}

export function filteredByTemps(temp){
    return{
        type: FILTEREDBYTEMPS,
        payload: temp
    }
}

export function clearDogDetail(){
    return {
        type: CLEAR,
    }
}

export function sort(order) {
    return {
        type: SORT, 
        payload: order
    }
}

export function sortByWeight(order){
    return {
        type: SORTBYWEIGHT,
        payload:order
    }
}
