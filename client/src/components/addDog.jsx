import axios from "axios"
import { useState, useEffect,} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTemperaments } from "../store/actions"

export default function AddDog(){
    const [name, setName] = useState('')
    const [minHeight, setMinHeight] = useState('')
    const [maxHeight, setMaxHeight] = useState('')
    const [minWeight, setMinWeight] = useState('')
    const [maxWeight, setMaxWeight] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [image, setImage] = useState('')
    const [temperaments, setTemperaments] = useState([])
    const [error, setError] = useState('')
    let dispatch = useDispatch()
    let temperamentos=useSelector((state) => state.temperaments)


    function validateName(value){
        if(!/^[^\s]+(\s+[^\s]+)*$/.test(value)){
            setError('The name must start and finish with a letter.')
            setName(value)
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
            setError('Special characters or numbers are not allowed.')
            setName(value)
        } else { setName(value)
        setError('')}
    }
    function validateMinHeight(value){
        if(!/^[0-9]{0,2}$/.test(value)){
            setError(`The min. height can't be lower than 0 or higher than 99.`)
            setMinHeight(value)
        } else { setMinHeight(value)
            setError('')}
    }
    function validateMaxHeight(value){
        if(!/^[0-9]{0,2}$/.test(value)){
            setError(`The max. height can't be lower than 0 or higher than 99.`)
            setMaxHeight(value)
        } else if (value < minHeight){
            setError(`The max height can't be lower than the min height`)
            setMaxHeight(value)
        } else { setMaxHeight(value)
            setError('')}
    }
    function validateMinWeight(value){
        if(!/^[0-9]{0,2}$/.test(value)){
            setError(`The max. weight can't be lower than 0 or higher than 99.`)
            setMinWeight(value)
        } else { setMinWeight(value)
            setError('')}
    }
    function validateMaxWeight(value){
        if(!/^[0-9]{0,2}$/.test(value)){
            setError(`The max. weight can't be lower than 0 or higher than 99.`)
            setMaxWeight(value)
        } else if (value < minWeight){
            setError(`The max weight can't be lower than the min height.`)
            setMaxWeight(value)
        } else { setMaxWeight(value)
            setError('')}
    }
    function validateMaxAge(value){
        if(!/^[0-9]{0,2}$/.test(value)){
            setError(`The max. age can't be lower than 0 or higher than 99.`)
            setMaxAge(value)
        } else {setMaxAge(value)
        setError('')}
    }
    function validateImage(value){
        if(!/^(ftp|http|https):\/\/[^ "]+$/.test(value)){
            setError(`The dog needs a picture! please bring a valid URL of an image.`)
            setImage(value)
        } else {setImage(value)
            setError('')}
    }  

    useEffect(()=>{
        dispatch(getTemperaments())
    }, [])

    

    function handleTempSelect(value){
        if(temperaments.includes(value)){
            setError(`You can't assign the same temperament twice to the dog.`)
        } else {setTemperaments([...temperaments, value])
            }
    }


    function clearState(){
        setName('')
        setMinHeight('')
        setMaxHeight('')
        setMinWeight('')
        setMaxWeight('')
        setMaxAge('')
        setImage('')
        setTemperaments([])
    }

    let dog ={
        name: name,
        weight: `${minWeight} - ${maxWeight}`,
        Height: `${minHeight} - ${maxHeight}`,
        maxAge: maxAge,
        image: image,
        temperament: temperaments
    }


    function onSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/dogs/', dog)
        clearState()
        alert('Dog created succesfully, you can see him at My Dogs section!')
    }
        return (<form onSubmit={onSubmit} id="form" className="form">
        <label htmlFor="">Name:</label>
        <input onChange={(e) => validateName(e.target.value)} name="name" type="text" value={name} autoComplete="off" autoFocus={true}/>

        <label htmlFor="">Min weight</label>
        <input onChange={(e) => validateMinWeight(e.target.value)} name="minWeight" type="number" value={minWeight} autoComplete="off"/>

        <label htmlFor="">Max weight</label>
        <input onChange={(e) => validateMaxWeight(e.target.value)} name="maxWeight" type="number" value={maxWeight} autoComplete="off"/>

        <label htmlFor="">Min height</label>
        <input onChange={(e) => validateMinHeight(e.target.value)} name="minHeight" type="number" value={minHeight} autoComplete="off"/>

        <label htmlFor="">Max height</label>
        <input onChange={(e) => validateMaxHeight(e.target.value)} name="maxHeight" type="number" value={maxHeight} autoComplete="off"/>

        <label htmlFor="">Life expectancy</label>
        <input onChange={(e) => validateMaxAge(e.target.value)} name="maxAge" type="number" value={maxAge} autoComplete="off"/>

        <label htmlFor="">Image:</label>
        <input onChange={(e) => validateImage(e.target.value)} name="image" type="text" value={image} autoComplete="off"/>

        <label htmlFor="">Select temperaments.</label>
        <select
            onChange={(e)=>{handleTempSelect(e.target.value)}}
            name="Temperaments"
            value={temperamentos}
            className="formInput">
            <option>Select</option>
            {temperamentos?.map((e)=><option key={e.id}>
                {e.name}
            </option>)}
        </select>

        <p>{temperaments.length ? `${temperaments.toString().replace(/,/g, ", ")}.`: 'Add temperaments for your new dog.'}</p>

        <input type="submit" value="Send"/>
        <input type="button" value="Clear form" onClick={clearState}/>

        {error? <span>{error}</span> : null}
    </form>)
}

