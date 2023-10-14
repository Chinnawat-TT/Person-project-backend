const createError = require("../utility/create-error");
const { upload }=require('../utility/cloudinary-service');
const prisma = require("../models/prisma");


exports.createMainImage = async(req,res,next)=>{
    try {
        console.log(req.files)
        console.log(req.body)

        const value = req.body

        if(req.files.mainImage){
            value.mainImage = await upload(req.files.mainImage[0].path)
        }
        console.log(value)
        const product = await prisma.product.create({
            data : value
        })
        console.log(product)

        const subImage ={productId : product.id}

        const upload = []
        upload= req.files.subImage[0]
        if(req.files.subImage){
            subImage.name = await upload(req.files.subImage[0].path)
        }
        // const imageSub = await prisma.productsimage.create({
        //     data :subImage
        // })
        // console.log(imageSub)
       
        res.status(200).json("create product success",)
    } catch (err) {
        next(err)
    }
}