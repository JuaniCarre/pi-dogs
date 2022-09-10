import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Order from '../order'
import { fetchDogs } from '../../store/actions'
import Dog from './dog'
import SearchBar from './searchBar'
import { NavLink } from 'react-router-dom'



export default function Dogs(){
    let dogs = useSelector((state) => state.filteredDogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [dispatch])
    return <div>
        
        <SearchBar/>
        <Order/>
        {dogs.map((dog) =>{
            return<NavLink to={`home/${dog.id}`} >
                <Dog name={dog.name} image={dog.image} />
            </NavLink> 
        })}
    </div>
}