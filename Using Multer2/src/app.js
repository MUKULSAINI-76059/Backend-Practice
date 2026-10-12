const express = require("express")
const app = express()
const multer = require("multer")
const cors = require("cors")

const uploadFile = require("./services/storage.service")
const postModel = require("./models/post")

app.use(cors())
app.use(express.json());

const upload = multer({storage:multer.memoryStorage()})

// See Data

app.get("/post", async (req,res) =>{
    const post = await postModel.find()

    res.status(201).json({
        message : "Post fetched successfully",
        post
    })
})


//  Send Data

app.post("/create-post",upload.single("image"), async (req,res ) =>{

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
})

app.patch("/post-caption/update/:id", async (req,res) =>{
    const id = req.params.id
    const caption = req.body.caption
    await postModel.findOneAndUpdate({
        _id:id},{caption:caption
    })
    res.status(200).json({
        message:"Post caption Updated"
    })
})
 
module.exports = app