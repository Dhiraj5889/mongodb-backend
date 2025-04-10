const express=require('express')
const product = require('../models/product')
const router=express.Router()

router.post('/add',async(req,res)=>{
    try{
        const {productName,productPrice,productUnit,productDescription}=req.body
        const productObj= new product({productName,productPrice,productUnit,productDescription})
        const productExit=await product.findOne({productName})
        if(productExit){
            return res.json({
                status:false,
                message:'Product alredy exit'
            })
        }
        await productObj.save()
        res.json({
            status:true,
            message:'product added  successfully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`Error ${error}`
        })
    }
})
router.get('/get',async(req,res)=>{
    try{
        const result=await product.find()
        res.json({
            status:true,
            message:result
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`Error ${error}`
        })
    }
})







module.exports=router