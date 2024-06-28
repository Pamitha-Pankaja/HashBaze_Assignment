const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require("./config/db")
require("dotenv").config({ path: "./config/config.env"});

const auth = require("./middlewares/auth")
const app = express();

//middleware
app.use(express.json())
app.use(morgan("tiny"))
app.use(require("cors")())

app.use("/api/" , require("./routes/auth"))

//server config
const PORT = process.env.PORT || 8000;
app.listen(PORT, async() => {
    await connectDB();
    console.log(`server listening on port : ${PORT}`)
});



