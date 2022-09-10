import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function AddDog(){
    const [dog, setDog] = useState({name:'', description:'', minHeight:'', maxHeight:'', minWeight:'', maxWeight:'', maxAge:'',image:''})
    function onInputChange(e){
        e.preventDefault()
        setDog({...dog,
                [e.target.name]: e.target.value,
                [e.target.description]: e.target.value,
                [e.target.minHeight]: e.target.value,
                [e.target.maxHeight]: e.target.value,
                [e.target.minWeight]: e.target.value,
                [e.target.maxWeight]: e.target.value,
                [e.target.maxAge]: e.target.value,
                [e.target.image]:e.target.value,
            })
        }
        function onSubmit(e){
            e.preventDefault()
            console.log(dog.undefined)
            axios.post('http://localhost:3001/dogs/', dog)
        }
        return (<form onSubmit={onSubmit}>
        <label htmlFor="">Name:</label>
        <input onChange={onInputChange} name="name" type="text" value={dog.name}/>

        <label htmlFor="">Description</label>
        <input onChange={onInputChange} name="description" type="text" value={dog.description}/>

        <label htmlFor="">Min weight</label>
        <input onChange={onInputChange} name="minWeight" type="number" value={dog.minWeight}/>

        <label htmlFor="">Max weight</label>
        <input onChange={onInputChange} name="maxWeight" type="number" value={dog.maxWeight}/>

        <label htmlFor="">Min height</label>
        <input onChange={onInputChange} name="minHeight" type="number" value={dog.minHeight}/>

        <label htmlFor="">Max height</label>
        <input onChange={onInputChange} name="maxHeight" type="number" value={dog.maxHeight}/>

        <label htmlFor="">Life expectancy</label>
        <input onChange={onInputChange} name="maxAge" type="number" value={dog.maxAge}/>

        <label htmlFor="">Image:</label>
        <input onChange={onInputChange} name="image" type="text" value={dog.image}/>

        <input type="submit" value="enviar"/>
    </form>)
}

