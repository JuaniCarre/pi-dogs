const { Router } = require('express');
const axios = require ('axios')
const {Dog, Temperament} = require('../db.js');
const router = Router();
const { Op } = require('sequelize')



router.get('/:id', async (req, res, next)=>{
const {id} = req.params
const apiDogs= await axios.get('https://api.thedogapi.com/v1/breeds')
const dbDogs = await Dog.findAll({
    include:Temperament
})
try{
    if(id.length > 5) {
        var filteredDbDogs=dbDogs.filter((dog)=> dog.id === id)
        res.send(filteredDbDogs[0])
    } else {
        var filteredApiDogs =  apiDogs.data.filter((dog)=> dog.id==id)
        if(filteredApiDogs[0].weight.metric === 'NaN'){
            filteredApiDogs[0].weight.metric = '29 - 39'
            res.send(filteredApiDogs)
        } else {
            res.send(filteredApiDogs)
        }
    }
}
catch(error){
    next(error)
}
})


router.get("/search/name", async (req, res, next) => {
const name = req.query.name

let dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
try {
    if (name) {
        let dogsDb = await Dog.findAll({
            include: Temperament,
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%",
                },
            },
            order: [["name", "ASC"]],
        });
        let dogsDbFiltered = dogsDb.map((ele) => {
            return {
                id: ele.id,
                image: ele.image,
                name: ele.name,
                temperaments: ele.temperaments.map((ele) => ele.name),
                weight: ele.Weight,
            };
        });
        let findDog = dogsApi.data.filter((ele) =>
        ele.name.toLowerCase().includes(name.toLocaleLowerCase())
        );
        
        let findDogFiltered = await findDog.map((ele) => {
            return {
                id: ele.id,
                image: ele.image.url,
                name: ele.name,
                temperament: ele.temperament,
                weight: ele.weight.metric,
            };
        });      
        
        let result = dogsDbFiltered.concat(findDogFiltered);
        result.length ? res.json(result) : res.status(404).send("No dog found")
    } else {
        let arrangeTemp = []
        let dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
        let dogsDb = await Dog.findAll({
            include: Temperament,
        });
        let dogsDbFiltered = dogsDb.map((ele) => {
            return {
        id: ele.id,
        image: ele.image,
        name: ele.name,
        temperament: ele.temperaments.map((ele) => ele.name),
        weight: `${ele.minWeight} - ${ele.maxWeight}`,
    };
});



let resultFiltered = await dogsApi.data.map((ele) => {
        arrangeTemp.push({
            id: ele.id,
            image: ele.image.url,
            name: ele.name,
        temperament: Object.assign([],  ele.temperament).join("").split(","),
        weight: ele.weight.metric==="NaN"? '29 - 39': ele.weight.metric,
    });
});

let allDogsFiltered = dogsDbFiltered.concat(arrangeTemp);

return res.send(allDogsFiltered);
}
} catch (error) {
    next(error);
}
});

router.get('/dogTemp/:dogId/:temperamentId', async(req, res, next)=>{
    let {dogId, temperamentId}=req.params

    try{
        const dog = await Dog.findByPk(dogId)
        const search = await Dog.findOne({
            include: Temperament,
            where: {
                id: dogId
            }})
            if(!search.temperaments.length){
                await dog.addTemperament(temperamentId)
                res.send(dog)
            } else {
                res.json(search)
            }
        }
    catch(error) 
    {next(error)}
});

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
                weight :dog.weight.metric,
                Height: dog.height.metric,
                maxAge:dog.life_span,
                temperament: dog.temperament,
                id: dog.id,
            }
        })
        let allDogs=filteredDogs.concat(dbDogs)
        res.send(allDogs)
    })}
    catch(error)
        {next(error)}
});
router.post('/', async (req, res, next)=>{
    try{
        const {name, weight, Height, maxAge, image, temperament}=req.body
        const newDog = await Dog.create({
            name: name,
            weight: weight,
            Height: Height,
            maxAge: maxAge,
            image: image,
        })
        if (typeof temperament === "object") {
            for (let i = 0; i < temperament.length; i++) {
                let temperamentsFind = await Temperament.findAll({where: {name:  temperament[i] } })
                await newDog.addTemperaments(temperamentsFind)
            }
        } else {
            const newDogTemps = await Temperament.findAll({where: {name:temperament}})
            newDog.addTemperaments(newDogTemps)
        }
        

        res.send(newDog.json)
    } 
    catch(error){
        next(error)
    }
    
});



module.exports = router;
