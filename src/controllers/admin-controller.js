const fs =require('fs/promises')
const createError = require("../utility/create-error");
const { upload }=require('../utility/cloudinary-service');
const prisma = require("../models/prisma");
const { checkProductIdSchema } =require("../validators/product-validator")

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

exports.deleteProduct = async (req,res,next) =>{
try {
    console.log(req.params)
    const { value ,error } = checkProductIdSchema.validate(req.params)
    if(error){
        return next(error)
    }
    console.log(value)

    const existProduct = await prisma.product.findFirst({
        where :{
            id :value.productId
        }
    })
    if(!existProduct){
        return next(createError(400,"you can not delete this product"))
    }
    await prisma.cart.deleteMany({
        where:{
            productId : value.productId
        }
    })

    await prisma.productsimage.deleteMany({
        where:{
            productId : value.productId
        }
    })


    await prisma.product.delete({
        where:{
            id : value.productId
        }
    })
    
    console.log(existProduct)
    res.status(200).json({message : " delete success "})
} catch (err) {
    next(err)
}
}

exports.editProduct = async (req ,res ,next)=>{
try {
    const { value ,error } = checkProductIdSchema.validate(req.params)
    if(error){
        return next(error)
    }
    // console.log("== params ==",value)

    const data = req.body
    // console.log("== body ==",data)

    const existProduct = await prisma.product.findFirst({
        where :{
            id :value.productId
        }
    })

    if(!existProduct){
        return next(createError(400,"you can not delete this product"))
    }
    console.log(existProduct)
    await prisma.product.update({
        data :{
            name : data.name,
            price : data.price,
            description : data.description
        },where :{
            id : value.productId
        }
    })
    const response = await prisma.product.findMany({
        
    })
    // const result= []
    // result.push(response)
    // console.log(result)
    res.status(200).json(response)
} catch (err) {
    next(err)
}
}

exports.getOrder = async (req ,res ,next) =>{
    try {
        const MyOrder =await prisma.order.findMany({
           include :{
                Orderitem :{
                    include:{
                        products :{
                            include:{
                                Productsimage : true
                            }
                        }
                    }
                }
            },orderBy : {
                id : "desc"
            }
        })
        console.log(MyOrder)
        const update = MyOrder.map(el =>{
            return {
                id : el.id,
                status : el.status,
                slip : el.slip,
                orderTotal :el.orderTotal,
                name : el.Orderitem.map(el=> el.products.name),
                quantiny : el.Orderitem.map(el=> el.quantiny),
                size : el.Orderitem.map(el=> el.size),
                price : el.Orderitem.map(el=> el.price),
                imageUrl :el.Orderitem.map(el=> el.products.mainImage),
            }
        })
        const newData = update.map(item => {
            const newItem = {
              id: item.id,
              status: item.status,
              slip: item.slip,
              orderTotal: item.orderTotal,
              items: item.name.map((name, index) => ({
                name,
                quantiny: item.quantiny[index],
                size: item.size[index],
                price: item.price[index],
                imageUrl: item.imageUrl[index]
              }))
            };
            return newItem;
          });
        console.log(newData)

        res.status(200).json({Order: newData})
    } catch (err) {
        next(err)
    }
}

exports.approveOrder = async (req,res,next)=>{
    try {
        const target = req.params.orderId
        
        const findTarget =await prisma.order.findFirst({
            where:{
                id : +target
            }
        })
        
        if(!findTarget){
            return next(createError(400,"exist order"))
        }
        
        const data = req.body.status
        console.log(data)
        const update = await prisma.order.update({
            where:{
                id : +target
            },data :{
                status :data
            }
        })
        console.log(update)
        res.status(200).json({update})
    } catch (err) {
        next(err)
    }
}