const express = require("express")
const {user} = require("./mongodb")
const app = express()
const cors = require("cors")
const mongoDB = require("mongodb")
const {json,urlencoded} = require("express")
app.use(cors())
app.use(json(),urlencoded({extended:false}))
app.get("/",async(req,res)=>{
    try {
        res.send("hi")
    } catch (error) {
        res.send(error)
    }
})


app.post("/createUser",async(req,res)=>{
    try {
        const {email} = req.body
console.log(req.body);
        const checkuser = await user.findOne({email:email})
console.log(checkuser);
        if(checkuser){
            res.send("user already registered")
        }
        else{
            const data = await user.insertOne({...req.body})


            res.send(data)
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body


        const checkUser = await user.findOne({email:email})

        if(!checkUser){
            res.send("user not registered")
        }
        else{
            if(password == checkUser.password){

                res.send(checkUser)
            }
            else{
                res.send("wrong password")
            }
        }
    } catch (error) {
        res.send(error)
    }
})


app.post("/subscribe",async(req,res)=>{
    try {
        const {userId} = req.body

        const id = new mongoDB.ObjectId(userId)
        const checkUser = await user.findOne({_id:id})

        if(!checkUser){
            res.send("user not registered")
        }
        else{
            const data = await user.updateOne({_id:id},{$set:{subscriptionType : req.body.subscriptionType,subscriptionAmount : req.body.subscriptionAmount}})

            res.send(data)
        }
    } catch (error) {
        res.send(error)
    }
})
app.listen(4000,()=>console.log("server running on port 4000"))