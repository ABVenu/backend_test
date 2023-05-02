const express = require("express");
const { ArticleModel } = require("../model/article.model");
const { auth } = require("../middlewares/auth");
const { tracker } = require("../middlewares/tracker");
const { rateLimiter } = require("../middlewares/rateLimiter");


const articleRoute = express.Router()

articleRoute.use(auth)
articleRoute.use(tracker)
articleRoute.use(rateLimiter)


articleRoute.post("/add", async(req,res)=>{
    await ArticleModel.insertMany[req.body]
    res.json({msg:"Article Added"})
})


articleRoute.get("/get/:id", async(req,res)=>{
    const {title,category,page,limit} = req.query
    const q = {}
    q.userId = req.body.userId
    if(title){
        q.title = {$regex: title}
    }
    if(category){
        q.category = {$regex: category}
    }
    const p = page||1
    const lim = limit ||0
    const {id} = req.params.id
    if(id){
        let data = await ArticleModel.find({_id:id, userId: req.body.userId})
        res.json({msg:data})
        return
    }
    else{
        let data = await ArticleModel.find(q).skip((p-1)*lim).limit(lim)
        res.json({msg:data})
    }
    
})


articleRoute.patch("/edit/:id", async(req,res)=>{
    let data = await ArticleModel.findOneAndUpdate({_id:req.params.id,userId: req.body.userId}, req.body)
    res.json({msg:"Data Updated", data:data})
})

articleRoute.delete("/rm/:id", async(req,res)=>{
     await ArticleModel.findOneAndDelete({_id:req.params.id,userId: req.body.userId})
    res.json({msg:"Data Deleted"})
})


module.exports = {articleRoute}