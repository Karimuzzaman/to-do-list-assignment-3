// Requring Basic Lib 
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config({ path: './.env' });
const router = require("./src/routes/api.js")

// Opening cors
app.use(cors());

// Implementing Security
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ extended: true }))
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 3000 });
app.use(limiter)


// mongoose connection
let URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmbzoat.mongodb.net/to-do-list`;
let OPTION = { user: "", pass: "", autoIndex: true };
mongoose.connect(URL, OPTION)
    .then((res) => {
        console.log("Database Connected")
    })
    .catch((error) => {
        console.log(error)
    })




// implementing route
app.use("/api", router)

//implementing 404 route
app.use("*", (req, res) => {
    res.status(404).json({ message: "404!!! Route not found" })
})




module.exports = app;