// J APPELLE EXPRESS
const express = require("express");
// J INITIALISE DANS APP LE MODULE EXPRESS
const app = express();
// J IMPORTE MONGOOSE
const mongoose = require("mongoose");
// J'IMPORTE CORS
const cors = require("cors");

// JE ME CONNECT A LA DATABASE
mongoose.connect("mongodb+srv://admin" + process.env.MONGO_ATLAS_PW + "@cluster0-e0vot.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( () => console.log("Connection to MongoDB successfull"))
.catch( () => console.log("Connection to MongoDB failed"));

const bodyParser = require("body-parser");
const morgan = require("morgan");


