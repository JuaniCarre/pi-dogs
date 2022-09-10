import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchDogs } from "../store/actions";
import Dog from "./Home/dog";

export default function MyDogs(){
    let dogs = useSelector((state) => state.filteredDogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [dispatch])
    return <div>
        {dogs.map((dog) =>{
            if(dog.id.length > 5){
                var dbDogs = []
                dbDogs.push(dog)
                if(dbDogs.length === 0){
                    <div><p>You never created a dog yet, create yout first breed</p>
                    </div>
                } else {
                    return <NavLink to={`home/${dog.id}`}>
                        <Dog name={dog.name} image={dog.image}/>
                    </NavLink>
                }
                }
        })}
    </div>
}