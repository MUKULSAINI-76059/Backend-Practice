const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    image: String,
    caption : String,
})

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;  