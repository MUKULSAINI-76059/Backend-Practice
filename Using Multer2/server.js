const app = require("./src/app")
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();
const dns = require('dns');
const connectDB = require("./src/db/db")
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.use(cors());
connectDB()


const port = process.env.PORT;
app.listen(port,"0.0.0.0", () =>{
    console.log(`http://localhost:${port}`)
})