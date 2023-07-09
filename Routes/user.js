const express =require('express')
const router = express.Router()
const {mongodb,dbName,dbUrl}=require('../Config/dbConfig')

const MongoClient= mongodb.MongoClient
const client=new MongoClient(dbUrl)

router.get('/',async(req,res)=>{
    await client.connect()
    try{
        let db=await client.db(dbName)
        let data=await db.collection('user').find().toArray()
        res.status(200)
        .send({
            message:"Data fetched sucessfully",data
        })
    }catch (error) { 
        res.status(500)
        .send({
            message:"internal server error"
        })
    }finally{
        client.close()
    }
})

router.post('/',async(req,res)=>{
    await client.connect()
    try{
        let db=await client.db(dbName)
        let data=await db.collection('users').insertOne(req.body)
        res.status(200)
        .send({
            message:"Data saved sucessfully"
        })
    }catch (error) {
        res.status(500)
        .send({
            message:"internal server error"
        })
    }finally{
        client.close()
    }
})

router.get('/:id',async(req,res)=>{
    await client.connect()
    try{
        let db=await client.db(dbName)
        let data=await db.collection('user').findOne({_id:new mongodb.ObjectId(req.params.id)})
        res.status(200)
        .send({
            message:"Data fetched sucessfully",data
        })
    }catch (error) { 
        res.status(500)
        .send({
            message:"internal server error"
        })
    }finally{
        client.close()
    }
})

router.put('/:id',async(req,res)=>{
    await client.connect()
    try{
        let db=await client.db(dbName)
        let data=await db.collection('user').updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:req.body})
        res.status(200)
        .send({
            message:"Data Edited sucessfully",data
        })
    }catch (error) { 
        res.status(500)
        .send({
            message:"internal server edit error"
        })
    }finally{
        client.close()
    }
})



module.exports=router