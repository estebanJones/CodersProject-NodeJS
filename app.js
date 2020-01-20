// J APPELLE EXPRESS
const express = require("express");
// J INITIALISE DANS APP LE MODULE EXPRESS
const app = express();
// J IMPORTE MONGOOSE
const mongoose = require("mongoose");
// J'IMPORTE CORS
const cors = require("cors");
// JE ME CONNECT A LA DATABASE
mongoose.connect("mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@codersproject-hkv6f.gcp.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("Connection to MongoDB successfull"))
    .catch((err) => console.log("Connection to MongoDB failed", err));

const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// import des routes
const userRoutes = require("./api/routes/user");
const teammateRoutes = require("./api/routes/teammate");
const taskRoutes = require("./api/routes/task");
const projectRoutes = require("./api/routes/project");
const candidatRoutes = require("./api/routes/candidat");


app.use("/user", userRoutes);
app.use("/teammate", teammateRoutes);
app.use("/task", taskRoutes);
app.use("/project", projectRoutes);
app.use("/candidat", candidatRoutes);


//message d'erreur
app.use((req, res, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    })

});

module.exports = app;