const express = require('express')

const verifiController =require('../controllers/verifi-controller')
const authenticaeMiddleware = require('../middleware/authenticate')
const router =express.Router()

router.post('/signup',verifiController.signup)
router.post('/login',verifiController.login)
router.get("/me",authenticaeMiddleware,verifiController.getme)
module.exports=router