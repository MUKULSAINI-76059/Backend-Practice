const express = require("express");
const app = express();
const path =require("path");
const User = require("./models/User");
const mongoose = require("mongoose");
const dns = require("dns");

require("dotenv").config();
dns.setServers(['8.8.8.8','8.8.4.4'])

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("mongoDB error : ", err))

app.get("/", function (req,res){
    res.render("index")
})

app.get("/read", async function (req,res){
    try {
        const users = await User.find();
        res.render("read", { users });
    } catch (err) {
        console.error("read error", err);
        res.status(500).send("Unable to load users");
    }
})


app.post("/create", async (req,res) => {
    if(!req.body.name || !req.body.email || !req.body.image){
        res.send("Please provide name, email and image URL")
    }
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        image:req.body.image
    })
    try {
        await user.save();
        res.render("createSuccess", {
        message: "User record created successfully!"
    })} catch (err) {
        res.send("Error creating user")
    }   
})

app.get("/delete/:id", async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.render("delete", { user });
    } catch (err) {
        res.send("User not found");
    }
});

app.post("/delete/:id", async function (req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.send("User not found");
        }

        res.render("deleteSuccess", {
        message: "Deletion completed successfully!"
    })  } catch (err) {
        res.status(500).send("Error deleting user");
    }
});

app.get("/edit/:id", async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.send("User not found");

        res.render("edit", { user });
    } catch (err) {
        res.send("Error loading edit page");
    }
});

app.post("/edit/:id", async function (req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                image: req.body.image
            },
            { returnDocument: "after" , runValidators: true }
        );

        if (!updatedUser) {
            return res.send("User not found");
        }

        res.render("editSuccess", {
            message: "User details updated successfully!"
        });
    } catch (err) {
        res.status(500).send("Error updating user");
    }
});

const port = process.env.PORT;
app.listen(port,() =>{
    console.log(`http://localhost:${port}`);
})