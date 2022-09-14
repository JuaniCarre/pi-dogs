import { useDispatch } from "react-redux"
import { Light, Heavy } from "../../constantes/sort"
import { sortByWeight } from "../../store/actions"


export default function WeightOrder({setCurrentPage ,setWeightOrder}){
    const dispatch = useDispatch()

    function onSelectChange(e) {
        e.preventDefault()
        dispatch(sortByWeight(e.target.value))
        setCurrentPage(1)
        setWeightOrder(e.target.value)
    }

    return <select name="Select" onChange={onSelectChange}>
    <option value={Light}>Light</option>
    <option value={Heavy}>Heavy</option>
</select>
}