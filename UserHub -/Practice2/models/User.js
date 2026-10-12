const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String
})

const User = mongoose.model("ImageData", userSchema)

module.exports = User;