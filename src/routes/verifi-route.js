const express = require('express')

const verifiController =require('../controllers/verifi-controller')
const authenticaeMiddleware = require('../middleware/authenticate')
const uploadMiddleware = require('../middleware/upload')

const router =express.Router()

router.post('/signup',verifiController.signup)
router.post('/login',verifiController.login)
router.post("/addtocart",authenticaeMiddleware,verifiController.addToCart)
router.patch("/addQuantity",authenticaeMiddleware,verifiController.addQuantity)
router.get("/getcart",authenticaeMiddleware,verifiController.getcart)
router.delete("/delete/:itemId/:cartId",authenticaeMiddleware,verifiController.deleteItemCart)
router.post("/checkout",authenticaeMiddleware,verifiController.checkOut)
router.get("/me",authenticaeMiddleware,verifiController.getme)
router.get("/getMyorder",authenticaeMiddleware,verifiController.getMyOrder)
router.patch("/confirmTrack/:productId",authenticaeMiddleware,uploadMiddleware.single("image"),verifiController.confirmTrack)

module.exports=router