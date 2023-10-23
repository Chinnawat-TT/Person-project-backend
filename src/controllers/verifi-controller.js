const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const prisma = require('../models/prisma')
const { signupSchema, loginSchema } = require('../validators/verifi-validatir')
const createError = require('../utility/create-error')

exports.signup = async (req,res,next)=>{
try {
    const { value ,error} = signupSchema.validate(req.body)
    if(error) return next(error)
    value.password = await bcrypt.hash(value.password, 12)
    const user = await prisma.user.create({
        data : value
    })
    const payload = { userId : user.id }
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY || 'qwasedrfgt',
        {expiresIn : process.env.JWT_EXPIRE}
    )
    delete user.password
    console.log(user)
    res.status(201).json({accessToken ,user})
} catch (err) {
    next(err)
}
}

exports.login = async (req,res,next) =>{
try {
    const { value ,error } = loginSchema.validate(req.body)
    if(error) return next(error)
    const user = await prisma.user.findFirst({
        where :{
            OR :[
                {email : value.email}
            ]
        }
})
    if(!user) return next(createError(400,'Invalid credential'))

    const checkMath = await bcrypt.compare(value.password, user.password)
    if(!checkMath) return next(createError(400,'Invalid credential'))
    
    const payload = { userId : user.id }
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY || 'qwasedrfgt',
        {expiresIn : process.env.JWT_EXPIRE}
    )
    delete user.password
    console.log(user)
    const findCart = await prisma.cart.findMany({
        where :{
            userId : user.id
        }
    })
    res.status(201).json({accessToken ,user ,findCart})
} catch (err) {
    next(err)
}
}

exports.getme = (req ,res ,next) =>{
    res.status(200).json({ user : req.user})
}

exports.addToCart = async (req,res,next)=>{
try {
    console.log("add to cart ja")
    // console.log("user =",req.user)
    // console.log("body =",req.body)
    const user = req.user
    const value = req.body
    console.log(user)
    console.log(value)
    const data = {}
    data.userId =user.id
    data.productId =value.id
    data.size = value.size
    console.log(data)

    const response =await prisma.cart.create({
        data :data
    }) 

    console.log(response)

    res.status(200).json(response)
} catch (err) {
    next(err)
}
}

exports.getcart = async (req,res,next)=>{
    try {

        console.log(req.user)
        const findCart = await prisma.cart.findMany({
            where :{
                userId : req.user.id
            },include :{
                products :{
                    
                }
            }
        })
        console.log(findCart.length)

        res.status(200).json(findCart)
    } catch (err) {
        next(err)
    }
}