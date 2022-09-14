import { useDispatch } from "react-redux"
import { AZ, ZA } from "../constantes/sort"
import { sort } from "../store/actions"


export default function Order({setCurrentPage ,setOrder}){
    const dispatch = useDispatch()
    function onSelectChange(e) {
        e.preventDefault()
        dispatch(sort(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    return <select name="Select" onChange={onSelectChange}>
    <option value={AZ}>A-Z</option>
    <option value={ZA}>Z-A</option>
</select>
}