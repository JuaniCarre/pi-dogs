import axios from 'axios'
export const FETCH_DOGS = 'FETCH_DOGS'


export function fetchDogs() {
    return function (dispatch){
        axios.get('http://localhost:3001/dogs')
        .then((dogs) => {
            dispatch({
                type:FETCH_DOGS,
                payload: dogs,
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}

export function searchDogs(name){

}