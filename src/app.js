require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");


const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error')
const ratelimitMiddleware = require('./middleware/rate-limit')
const verifiRoute =require('./routes/verifi-route')
const adminRoute =require('./routes/admin-route')
const saleRoute =require('./routes/sale-route')
const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(ratelimitMiddleware)
app.use(express.json())

app.use('/verifi',verifiRoute)
app.use('/sale',saleRoute)
app.use('/admin',adminRoute)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT =process.env.PORT || '5000'
app.listen(PORT ,()=> console.log(`server run on port : ${PORT}`))