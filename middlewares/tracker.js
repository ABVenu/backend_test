
const fs = require("fs")
const tracker = async(req,res,next)=>{
  let data = `Ip:${req.ip} || method: ${req.method} ||url: ${req.url} || data: ${Date()}\n`
  console.log(data)
   fs.appendFileSync("./tracker.txt",data)
   next()

}

module.exports={tracker}