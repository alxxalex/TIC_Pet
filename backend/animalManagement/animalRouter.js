const express = require('express')
const router = express.Router();
const animalService = require('./animalService')
const { validate } = require('../middleware/validate')
const { validateToken } = require('../middleware/validateToken')

router.post('/animal',validateToken, validate, animalService.addAnimal);
router.get('/animal',validateToken, validate, animalService.getAnimals);

module.exports = router