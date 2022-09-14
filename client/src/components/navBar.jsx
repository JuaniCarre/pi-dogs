import { Link } from "react-router-dom";

export default function navBar(){
    return <>
    <Link to='/home'>Home</Link>
    <br></br>
    <Link to='/myDogs'>My dogs</Link>
    <br></br>
    <Link to='/addDog'>adDog</Link>
    <br></br>
    </>
}