const express = require('express')

const adminAuthenticateMiddleware = require('../middleware/adminAuthenticate')
const uploadMiddleware = require('../middleware/upload')
const adminController = require('../controllers/admin-controller')
const router =express.Router()



router.post("/",adminAuthenticateMiddleware,uploadMiddleware.fields([
    { name : "mainImage",maxCount: 1 }
]),adminController.createMainImage)
module.exports=router