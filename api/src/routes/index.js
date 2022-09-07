const { Router } = require('express');
const dogsRoute = require('./dogs.js')
const temperamentRoute = require('./temperament.js')


const router = Router();


router.use('/dogs', dogsRoute)
router.use('/temperaments', temperamentRoute)


module.exports = router;
