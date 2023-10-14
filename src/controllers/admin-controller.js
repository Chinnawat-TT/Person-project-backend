const createError = require("../utility/create-error");
const { upload }=require('../utility/cloudinary-service');
const prisma = require("../models/prisma");


exports.createMainImage = async(req,res,next)=>{
    try {
        console.log(req.files)
        console.log(req.body)

        const value = req.body

        if(req.files){
            value.mainImage = await upload(req.files.mainImage[0].path)
        }
        console.log(value)
        const product = await prisma.product.create({
            data : value
        })
        console.log(product)
        // if (!req.files) {
        //     return next(createError(400,"image is required"));
        //   }
        
        // const response ={}
        // if( req.files.mainImage){
        //     const url = await upload(req.files.mainImage[0].path)
        //     response.mainImage = url
            
        // }
    } catch (err) {
        next(err)
    }
}