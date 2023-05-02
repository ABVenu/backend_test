const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
      name:String,
      category:String,
      likes:Number,
      userId:{type: mongoose.Schema.Types.ObjectId}
})


const ArticleModel = mongoose.model("article",articleSchema)


module.exports = {ArticleModel}