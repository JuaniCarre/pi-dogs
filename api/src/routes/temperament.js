const { Router } = require('express');
const {Temperament} = require ('../db.js')
const router = Router();
const axios = require ('axios')

router.get('/', async (req, res, next)=>{
    let temps = await axios.get('https://api.thedogapi.com/v1/breeds')

    try{
    let allTemps = []
    let eachDogTemps = []
    temps.data.forEach(dog => {
        if(dog.temperament){allTemps.push(dog.temperament)}
    });
    allTemps.forEach(el=>{
        eachDogTemps.push(el.split(', '||','))
        })
        let separatedTemps = []
        eachDogTemps.forEach(dog=>dog.forEach(el=>separatedTemps.push(el)))
        let uniqueTemps = [...new Set(separatedTemps)]//temperamentos UNICOS en un array. AL FIN!
        uniqueTemps.forEach(el=>Temperament.findOrCreate({where: {name:el}}))
        let cargar = await Temperament.findAll()
        res.send(cargar)
    }
    catch(error){
        next(error)
    }
})

// router.post


module.exports = router;
