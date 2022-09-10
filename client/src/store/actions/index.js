import axios from 'axios';
export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SORT = 'SORT'
export const DETAIL_DOG = 'DETAIL_DOG'
export const CLEAR = 'CLEAR'


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
        axios.get('https://api.thedogapi.com/v1/breeds/search?' + name)
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