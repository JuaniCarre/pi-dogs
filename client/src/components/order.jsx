import { useDispatch } from "react-redux"
import { AZ, ZA } from "../constantes/sort"
import { sort } from "../store/actions"


export default function Order(){
    const dispatch = useDispatch()
    function onSelectChange(e) {
        dispatch(sort(e.target.value))
    }

    return <select name="Select" onChange={onSelectChange}>
    <option value={AZ}>A-Z</option>
    <option value={ZA}>Z-A</option>
</select>
}