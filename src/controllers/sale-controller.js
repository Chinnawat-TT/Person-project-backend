const prisma = require("../models/prisma")




exports.salePageMen = async (req,res,next)=>{
    try {
        const categoriesMen = await prisma.product.findMany({
            where :{
                categories : "MEN"
            },select :{
                id : true,
                name :true,
                price : true,
                mainImage : true
            }
        })
        console.log(categoriesMen)
        res.status(200).json(categoriesMen)
    } catch (err) {
        next(err)
    }
}

exports.salePageWomen = async (req,res,next)=>{
    try {
        const categoriesWoMen = await prisma.product.findMany({
            where :{
                categories : "WOMEN"
            },select :{
                id : true,
                name :true,
                price : true,
                mainImage : true
            }
        })
        console.log(categoriesWoMen)
        res.status(200).json(categoriesWoMen)
    } catch (err) {
        next(err)
    }
}

exports.salePageKids = async (req,res,next)=>{
    try {
        const categoriesKids = await prisma.product.findMany({
            where :{
                categories : "KIDS"
            },select :{
                id : true,
                name :true,
                price : true,
                mainImage : true
            }
        })
        console.log(categoriesKids)
        res.status(200).json(categoriesKids)
    } catch (err) {
        next(err)
    }
}

exports.getProductItem = async(req,res,next)=>{
try {
    console.log("++++++++++++++++++++++")
    const{itemId}=req.params
    const item = await prisma.product.findFirst({
        where : {
            id : +itemId
        }
    })
    console.log(item)
    const subImage = await prisma.productsimage.findMany({
        where :{
            productId : +itemId
        }
    })
    console.log(subImage)
    res.status(200).json("get success",subImage,item)
} catch (err) {
    next(err)
}
}