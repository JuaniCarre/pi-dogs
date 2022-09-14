import { useEffect, } from "react"
import { useParams } from "react-router-dom"
import { clearDogDetail, getDogById, } from "../../store/actions"
import { useDispatch, useSelector } from 'react-redux'

export default function DogDetail(){
    let { id } = useParams()
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDogById(id))
        return ()=>{dispatch(clearDogDetail())}
    }, [])
    //console.log(getDogById(id))
    let res = useSelector((state)=>state.dogDetail)
    return <div>
        { 
            res ?
            <>
            <h3>{res?.name}</h3>
            <img src={res?.image} alt={`Picture of the dog.`}></img>
            <p>Height: {res?.Height} cm.</p>
            <p>Weight: {res?.Weight} Kg.</p>
            <p>Life expectancy: {res?.maxAge}</p>
            {/* <p>Temperaments: {res[0]?.temperament}</p> */}
            </> :
            <div>Loading</div>
        } 
        </div>
}

