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
    console.log(res)
    if(res.length){
        return <div>
                <>
                <h3>{res[0]?.name}</h3>
                <img src={res[0]?.image.url} alt={`Picture of the dog.`}></img>
                <p>Height: {res[0]?.height.metric} cm.</p>
                <p>Weight: {res[0]?.weight.metric} Kg.</p>
                <p>Life expectancy: {res[0]?.life_span}</p>
                </>
            </div>
    } else {
        return <div>
                <>
                <h3>{res?.name}</h3>
                <img src={res?.image} alt={`Picture of the dog.`}></img>
                <p>Height: {res?.Height} cm.</p>
                <p>Weight: {res?.weight} Kg.</p>
                <p>Life expectancy: {res?.maxAge}</p>
                </>
            </div>
    }
}

