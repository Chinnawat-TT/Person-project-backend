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
    } catch (error) {
        
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
    } catch (error) {
        
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
    } catch (error) {
        
    }
}