const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User = require('./models/User')

const productRoutes=require('./routes/productRoutes')

const server=express()
server.use(cors())
server.use(bodyParser.json())
server.use('/product',productRoutes)


mongoose.connect('mongodb+srv://dhiraj:Dhiraj%40123@cluster0.o6utges.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('Database is connected')) .catch((err)=>console.log(err))

server.post('/register',async(req,res)=>{
    try{
        const {fullName,userName,age,password}=req.body
        const userObj= new User({fullName,userName,age,password})
        const userExit=await User.findOne({userName})
        if(userExit){
            return res.json({
                status:false,
                message:'user alredy exit'
            })
        }
        await userObj.save()
        res.json({
            status:true,
            message:'user register successfully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`Error ${error}`
        })
    }
})
server.get('/get-user/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const result=await User.find()
        
        res.json({
            status:true,
            message:result
        })
    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})

server.post('/login',async(req,res)=>{
    try{
        const {userName,password}=req.body
        const userExit=await User.findOne({userName})
        if(!userExit){
            return res.json({
                status:false,
                message:'user not found'
            })
        }
        if(password !==userExit.password){
            return res.json({
                status:false,
                message:'Incorrect password'
            })
        }
        res.json({
            status:true,
            message:'Login succsefully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`Error ${error}`
        }) 
    }
})
server.get('/get-users/:userName',async(req,res)=>{
    try{
        const userName = req.params.userName
        const obj = await User.find({userName})
        res.json({
            status:true,
            message:obj
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`Error ${error}`
        }) 
    }
})


server.listen(8055,()=>{
    console.log('server is listen on port no 8055')
})