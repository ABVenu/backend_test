const express= require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const { connectToDb } = require("./config/db")
const { userRoute } = require("./routes/user.routes")
const { articleRoute } = require("./routes/Article.routes")

const app = express()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("hi")
})

app.use("/user",  userRoute)
app.use("/article", articleRoute)
console.log(process.argv[2])
app.listen(process.argv[2], async()=>{
    try{
        await connectToDb
        console.log("connected to Db")
    }
    catch(err){
        console.log(err)
        console.log("failed to connect to db")
    }

    console.log("server started")
} )