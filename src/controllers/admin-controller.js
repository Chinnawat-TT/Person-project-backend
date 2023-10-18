const fs =require('fs/promises')
const createError = require("../utility/create-error");
const { upload }=require('../utility/cloudinary-service');
const prisma = require("../models/prisma");


exports.createMainImage = async(req,res,next)=>{
    try {
        console.log("main :",req.files.mainImage)
        console.log("sub : ",req.files.subImage)
        
        // console.log("--------------------",req.body.message)

        const value = JSON.parse(req.body.message)
        
        if(req.files.mainImage){
            value.mainImage = await upload(req.files.mainImage[0].path)
        }
        console.log(value)
        const product = await prisma.product.create({
            data : value
        })
        console.log(product)

        const idSubImage ={productId : product.id}
        console.log(idSubImage)
        const {subImage} = req.files
        
        console.log(subImage)
      
        if (req.files.subImage){
            for(element of subImage){

                idSubImage.name = await upload(element.path)
                
                 await prisma.productsimage.create({
                        data :idSubImage
                    })
                    
            }
            
        }

       
        res.status(200).json("upload done")
    } catch (err) {
        next(err)
    } finally {
        if(req.files.mainImage){
            fs.unlink(req.files.mainImage[0].path)
        }
        if(req.files.subImage){
            for( let i = 0 ; i<req.files.subImage.length ; i++){
                fs.unlink(req.files.subImage[i].path)
            }
        }
    }
}

exports.getAllProducts =async (req,res ,next) =>{
try {
    const result = await prisma.product.findMany({

    })
    console.log(result)
    res.status(200).json(result)
} catch (err) {
    next(err)
}
}