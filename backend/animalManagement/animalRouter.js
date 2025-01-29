const express = require('express')
const router = express.Router();
const animalService = require('./animalService')
const { validate } = require('../middleware/validate')
const { validateToken } = require('../middleware/validateToken')
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post('/animal',validateToken, validate, animalService.addAnimal);
router.get('/animal',validateToken, validate, animalService.getAnimals);
router.post('/animal/image',upload.single("image"),validateToken,validate,animalService.uploadAnimalImage);
router.delete('/animal/:id',validateToken,validate, animalService.deleteAnimal);
router.get('/animal/:id',validateToken,validate, animalService.getAnimalById);
router.put("/animal",validateToken,validate,animalService.updateAnimal)


module.exports = router