const Joi =require('joi')

const signupSchema = Joi.object({
    fullName :Joi.string().trim().required(),
    email : Joi.string().email().required(),
    password :Joi.string().min(6).required(),
    confirmPassword : Joi.string().valid(Joi.ref('password')).required().strip()
})
exports.signupSchema = signupSchema

const loginSchema = Joi.object({
    email :Joi.string().required(),
    password : Joi.string().required()
})
exports.loginSchema = loginSchema