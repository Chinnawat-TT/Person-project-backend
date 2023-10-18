const express = require('express')

const adminAuthenticateMiddleware = require('../middleware/adminAuthenticate')
const uploadMiddleware = require('../middleware/upload')
const adminController = require('../controllers/admin-controller')
const router =express.Router()



router.post("/",adminAuthenticateMiddleware,uploadMiddleware.fields([
    { name : "mainImage",maxCount: 1 },
    { name: "subImage", maxCount: 10 }
]),adminController.createMainImage)
router.get("/",adminAuthenticateMiddleware,adminController.getAllProducts)
router.delete("/:productId",adminAuthenticateMiddleware,adminController.deleteProduct)
router.patch("/detail/:productId",adminAuthenticateMiddleware,adminController.editProduct)
module.exports=router