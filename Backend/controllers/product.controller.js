import Product from "../models/product.model.js";
import {v2 as cloudinary} from "cloudinary";

//add product :/api/product/add-product
export const addProduct =async(req,res)=>{
    try{
    let productData =JSON.parse(req.body.productData);
    const images = req.files
    let imagesUrl = await Promise.all(
        images.map(async (item) => {  
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image"});
            return result.secure_url;
        })
    )
   
    await Product.create({
        ...productData,
        images: imagesUrl,
        seller: req.user._id
    });
    res.status(201).json({message:"Product added successfully",success:true})
    }
    catch(error){
        res.status(500).json({message:"Server error",error: error.message})

    }
}
//get products :/api/product/list

export const getProduct =async(req,res)=>{
   try{
    const products = await Product.find({}).sort({createdAt : -1});
    res.status(200).json({products,success:true})

   }
   catch(error){
    res.status(500).json({message:"Server Error",error:error.message})
   }
}


//get single product :/api/product/id
export const getProductById = async(req,res)=>{
  try{
  const {id}=req.body;
  const product = await Product.findById(id);
   if(!product){
    return res.status(404).json({message:"Product not found",success:false})
   }
    res.status(200).json({product ,sucess:true});
  }catch(error){
    res.status(500).json({message:"Server Error",error:error.message})
  }
}

//export stock :/api/product/stock
export const changeStock = async(req,res)=>{
    try{
      const {id,instock}=req.body;
      const  product = await Product.findByIdAndUpdate(id,{instock},{new:true});
      if(!product){
        return res.status(404).json({message:"Product not found",success:false});
      }
      res.status(200).json({product,success:true,message:"Stock Updated Successfully"});
    }
    catch(error){
     res.status(500).json({message:"Server Error",error:error.message})
    }
}