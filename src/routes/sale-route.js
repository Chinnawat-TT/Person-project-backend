const express = require('express')

const saleController = require('../controllers/sale-controller')
const router = express.Router()

router.get('/men',saleController.salePageMen)
router.get('/women',saleController.salePageWomen)
router.get('/kids',saleController.salePageKids)
router.get('/men/item/:itemId',saleController.getProductItem)
module.exports =router