const express = require("express");
const app = express()
const path = require("path")
const fs = require("fs")

const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/", function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files})
    })
})

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filedata:filedata, filename:req.params.filename})
    })
})

app.get("/edit/:filename",function(req,res){
    res.render("edit",{filename:req.params.filename})
})

app.get("/delete/:filename",function(req,res){
    res.render("delete",{filename:req.params.filename})
})

app.get("/delete/:filename/confirm",function(req,res){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        if(err) return res.status(500).send("Error deleting file")
            res.redirect("/")
    })
})  
app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.new.split(" ").join("")}.txt`,function(err){
        if(err) return res.status(500).send("Error renaming file")
            res.redirect("/")
    })
})

app.post("/create", function(req,res){
  if(!req.body.title || !req.body.details) {
    return res.status(400).send("Title and details required");
  }
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
    if(err) return res.status(500).send("Error creating file");
    res.redirect("/");
  })
})

app.listen(process.env.PORT, function(){
    console.log(`http://localhost:${process.env.PORT}`)
})

