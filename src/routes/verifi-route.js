const express = require('express')

const verifiController =require('../controllers/verifi-controller')
const router =express.Router()

router.post('/signup',verifiController.signup)
router.post('/login',verifiController.login)

module.exports=router