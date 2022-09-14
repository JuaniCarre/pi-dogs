import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Order from '../order'
import { fetchDogs } from '../../store/actions'
import Dog from './dog'
import SearchBar from './searchBar'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Page from './pagination'


export default function Dogs(){
    let dogs = useSelector((state) => state.filteredDogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [dispatch])
    const cards= 8
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = currentPage * cards
    const firstShown = cardsPerPage - cards
    const lastShown = dogs.slice(firstShown, cardsPerPage)

    function pagination(pageNumber){
        setCurrentPage(pageNumber)
    }
    console.log(dogs)

    return <div>
        
        <SearchBar/>
        <Order/>
        <Page cards={cards} dogs={dogs.length} pagination={pagination}/>
        {lastShown.map((dog) =>{
                return<NavLink to={`home/${dog.id}`} >
                <Dog name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.Weight || `${dog.minWeight} - ${dog.maxWeight}`}  />
            </NavLink> 
            
        })}
    </div>
}