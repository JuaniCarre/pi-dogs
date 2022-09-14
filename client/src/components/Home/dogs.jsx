import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Order from '../order'
import { fetchDogs } from '../../store/actions'
import Dog from './dog'
import SearchBar from './searchBar'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'



export default function Dogs(){
    let dogs = useSelector((state) => state.filteredDogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [dispatch])
    const [cards, setCards]= useState([])
    const [curretPage, setCurrentPage] = useState(1);
    const cardsPerPage=10


    return <div>
        
        <SearchBar/>
        <Order/>
        {dogs.map((dog) =>{
                return<NavLink to={`home/${dog.id}`} >
                <Dog name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.Weight || `${dog.minWeight} - ${dog.maxWeight}`}  />
            </NavLink> 
            
        })}
    </div>
}