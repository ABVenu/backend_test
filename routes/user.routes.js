const express = require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
const userRoute = express.Router()

userRoute.post("/register", async(req,res)=>{
    const {password} = req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.json({msg:err})
            return
        }
        if(hash){
            let data = {...req.body, password:hash}
            await UserModel.insertMany([data])
           res.json({msg: "User Registered"})
        }
    });
})


userRoute.post("/login", async(req,res)=>{
      let user = await UserModel.findOne({email: req.body.email})
      if(user){
        bcrypt.compare(req.body.password, user.password, async function(err, result) {
            // result == true
            if(err){
                res.json({msg:err})
                return
            }
            if(result){
                var token = jwt.sign({ userId: user._id }, 'shhhhh');
               res.json({msg: "Login Sucessfull", token:token})
            }
            else{
                res.json({msg:"Wrong Password, Plaese Login Today"})
            }

        });
      }
      else{
        res.json({msg:"User Not Found, Plaese Register"})
      }
})


module.exports = {userRoute}