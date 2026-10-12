const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const dns = require('dns');
const cors = require("cors"); 
const userRoutes = require("./routes/userRoutes")

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(cors())

// Middleware
app.use(express.json())

//MongoDB Connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api",userRoutes)
const PORT =process.env.PORT

app.listen(PORT, () => {
  console.log(`Example app listening on port 5500`)
  console.log(`http://localhost:${PORT}`)
})