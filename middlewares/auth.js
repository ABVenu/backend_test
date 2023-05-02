var jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{
   
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, 'shhhhh', function(err, decoded) {
       if(err){
        res.json({msg:"Something went wrong. Please login again"})
        return
       }
       if(decoded){
         req.body.userId = decoded.userId
         next()
       }
      });
}

module.exports={auth}