import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchDogs } from '../store/actions'
import Dog from './dog'



export default function Dogs(){
    let dogs = useSelector((state) => state.dogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [])
    console.log(dogs)
    return <div>
        Soy Dogs
    </div>
}