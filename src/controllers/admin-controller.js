const createError = require("../utility/create-error");
const { upload }=require('../utility/cloudinary-service')


exports.createMainImage = async(req,res,next)=>{
    try {
        console.log(req.files)
        if (!req.files) {
            return next(createError(400,"image is required"));
          }
        
        const response ={}
        if( req.files.mainImage){
            const url = await upload(req.files.mainImage[0].path)
            response.mainImage = url
        }
    } catch (err) {
        next(err)
    }
}