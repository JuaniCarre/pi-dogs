import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTemperaments }  from "../../store/actions";
import { filteredByTemps } from "../../store/actions";

export default function TempsFiltered({setCurrentPage}){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments());
    },[])
    const temperaments = useSelector(state=>state.temperaments)
    function onSelectChange(e){
        e.preventDefault()
        dispatch(filteredByTemps(e.target.value))
        setCurrentPage(1)
    }
    return <>
    <select onChange={onSelectChange}>
    <option disabled selected>Temperament</option>
    {temperaments.map(temp => <option key={temp.id} value={temp.name}>{temp.name}</option>)}
    
    </select>
    </>
}
