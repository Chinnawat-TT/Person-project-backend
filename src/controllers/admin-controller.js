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

        const idSubImage ={productId : product.id}

        const {subImage} = req.files
        
      
        if (req.files.subImage){
            
            for(element of subImage){
                idSubImage.name = await upload(element.path)
                imageSub = await prisma.productsimage.create({
                        data :idSubImage
                    })
            }
        }

       
        res.status(200).json("create product success",)
    } catch (err) {
        next(err)
    }
}