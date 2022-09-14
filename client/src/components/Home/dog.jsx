export default function Dog({name, image, temperament,weight}){
    
    return <div>
        <img src={image} alt="ESTAMOS EN LA B!"></img>
        <h3>{name}</h3>
        <h5>temperament: {temperament}</h5>
        <p>weight: {weight} Kg.</p>
        </div>
}