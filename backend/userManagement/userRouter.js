const express = require('express')
const router = express.Router();
const userService = require('./userService')
const { userValidationRules, loginValidationRules } = require('../validators/userValidator')
const { validate } = require('../middleware/validate')
const { validateToken } = require('../middleware/validateToken')

router.post('/users', userValidationRules(), validate, userService.registerUser);
router.post('/login', loginValidationRules(), validate, userService.loginUser);
// router

module.exports = router