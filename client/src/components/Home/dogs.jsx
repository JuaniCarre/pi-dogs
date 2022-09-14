import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Order from '../order'
import { fetchDogs, getTemperaments } from '../../store/actions'
import Dog from './dog'
import SearchBar from './searchBar'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Page from './pagination'
import WeightOrder from './weightOrder'
import TempsFiltered from './TempsFiltered'

export default function Dogs(){
    let dogs = useSelector((state) => state.filteredDogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
        dispatch(getTemperaments())
    }, [dispatch])
    
    const cards= 8
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = currentPage * cards
    const firstShown = cardsPerPage - cards
    const lastShown = dogs.slice(firstShown, cardsPerPage)
    const [order, setOrder] = useState('')
    const [weightOrder, setWeightOrder] = useState('')

    function pagination(pageNumber){
        setCurrentPage(pageNumber)
    }
    console.log(lastShown)
    return <div>
        
        <SearchBar/>
        <WeightOrder setCurrentPage= {setCurrentPage} setWeightOrder={setWeightOrder}/>
        <Order setCurrentPage= {setCurrentPage} setOrder={setOrder}/>
        <TempsFiltered setCurrentPage={setCurrentPage}/>
        <Page cards={cards} dogs={dogs.length} pagination={pagination}/>
        {lastShown.map((dog) =>{
                return<NavLink to={`home/${dog.id}`} >
                <Dog name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight || `${dog.minWeight} - ${dog.maxWeight}`}  />
            </NavLink> 
            
        })}
        <Page cards={cards} dogs={dogs.length} pagination={pagination}/>
    </div>
}