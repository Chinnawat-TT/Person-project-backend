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
        // const saleMen = await prisma.product.findMany({
    
        // })
        res.status(200).json(categoriesMen)
    } catch (error) {
        
    }
}