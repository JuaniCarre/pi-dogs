const { Router } = require('express');
const axios = require ('axios')
const {Dog, Temperament} = require('../db.js')
const router = Router();

router.get('/', (req, res, next)=>{
    try{
    let apiDogs = axios.get('https://api.thedogapi.com/v1/breeds');
    let dbDogs = Dog.findAll({
        include: Temperament
    })
    Promise.all([
        apiDogs,
        dbDogs,
    ])
    .then((respuesta) => {
        const [apiDogs, dbDogs] = respuesta
        let filteredDogs = apiDogs.data.map((dog) => {
            return {
                name : dog.name,
                description: dog.description,
                image: dog.image.url,
                Weight : dog.weight,
                Height: dog.height,
                id: dog.id,
            }
        })
        let allDogs=[...filteredDogs, ...dbDogs]
        res.send(allDogs)
    })}
    catch(error)
        {next(error)}
});

router.get('/:id', (req, res, next)=>{
    try{
    const id = req.params.id;
        let dog = Dog.findByPk(id)
        res.send(dog)}
        catch(error){
            next(error)
        }
})

router.get('/dogTemp', async(req, res, next)=>{
    let {dogId, temperamentId}=req.query
    try{
        const dog = await Dog.findByPk(dogId)
        const search = await Dog.findOne({
            include: Temperament,
            where: {
                id: dogId
            }})
        if(!search.temperaments.length){
            await dog.addTemperaments(temperamentId)
            res.send(dog)
        } else {
            res.json(search)
        }
    }
    catch(error) 
        {next(error)}
});

router.post('/', async (req, res, next)=>{
    try{
        const {name, description, minWeight, maxWeight, minHeight, maxHeight, maxAge, image}=req.body
        const newDog = await Dog.create({
            name: name,
            description: description,
            minWeight: minWeight,
            maxWeight: maxWeight,
            minHeight: minHeight,
            maxHeight:maxHeight,
            maxAge: maxAge,
            image: image,
        })
        res.send(newDog.json)
    } 
    catch(error){
        next(error)
    }
    
});


router.delete('/', (req, res, next)=>{
    res.send('soy delete /dogs')
})


module.exports = router;
