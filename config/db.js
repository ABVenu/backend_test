const mongoose = require("mongoose")
require('dotenv').config()

const connectToDb = mongoose.connect(process.env.mongo)

module.exports = {connectToDb}