const express = require('express')

const saleController = require('../controllers/sale-controller')
const router = express.Router()

router.get('/men',saleController.salePageMen)
module.exports =router