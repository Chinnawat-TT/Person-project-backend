const createError = require("../utility/create-error")
const jwt = require('jsonwebtoken')
const prisma = require('../models/prisma')
module.exports = async (req ,res ,next) =>{
 try {
        const authorization =req.headers.authorization
        console.log(authorization)
        if(!authorization || !authorization.startsWith('Bearer')){
            return next(createError(401,' you are not admin !! unauthenticated'))
        }
        const token = authorization.split( ' ' )[1]
        console.log(token)
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "kdkfiechhdwia")
        console.log(payload)
        const user = await prisma.user.findUnique({
            where :{
                id :  payload.userId
            }
        })
        if(!user){
            return next(createError(401,' you are not admin !! unauthenticated'))
        }
        if(!user.isAdmin === true){
            return next(createError(401,' you are not admin !! unauthenticated'))
        }
        delete user.password
        req.user = user
        console.log("admin in coming")
        next();
 } catch (error) {
    if( err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError'){
        err.statusCode =401
    }
    next(err)
 }
}