import { useEffect, } from "react"
import { useParams } from "react-router-dom"
import { clearDogDetail, getDogById } from "../../store/actions"
import { useDispatch, useSelector } from 'react-redux'

export default function DogDetail(){


    let { id } = useParams()
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDogById(id))
        return ()=>{dispatch(clearDogDetail())}
    }, [dispatch, id])
    console.log(getDogById(id))
    let res = useSelector((state)=>state.dogDetail)
    return <div>
        { 
            res ?
            
            <>
            <h3>{res[0]?.name || res?.name}</h3>
            <img src={res[0]?.image.url || res?.image} alt={`picture of a ${res[0]?.name}`}></img>
            <p>Height: {res[0]?.height.metric|| res?.minHeight + ` - ` + res?.maxHeight} cm.</p>
            <p>Weight: {res[0]?.weight.metric|| res?.minWeight + ` - ` + res?.maxWeight} Kg.</p>
            <p>Life expectancy: {res[0]?.life_span||res?.maxAge}</p>
            <p>Description: {res[0]?.description || res?.description||`These dogs are ${res[0]?.temperament}`}</p>
            </> :
            <div>Loading</div>
        } 
        </div>
}