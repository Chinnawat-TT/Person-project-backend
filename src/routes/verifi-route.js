const express = require('express')

const verifiController =require('../controllers/verifi-controller')
const authenticaeMiddleware = require('../middleware/authenticate')

const router =express.Router()

router.post('/signup',verifiController.signup)
router.post('/login',verifiController.login)
router.post("/addtocart",authenticaeMiddleware,verifiController.addToCart)
router.get("/getcart",authenticaeMiddleware,verifiController.getcart)
router.delete("/delete/:itemId",authenticaeMiddleware,verifiController.deleteItemCart)
router.post("/checkout",authenticaeMiddleware,verifiController.checkOut)
router.get("/me",authenticaeMiddleware,verifiController.getme)
router.get("/getMyorder",authenticaeMiddleware,verifiController.getMyOrder)

module.exports=router