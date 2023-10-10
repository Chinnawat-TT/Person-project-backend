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
    res.status(201).json({accessToken ,user})
} catch (error) {
    
}
}