require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

const { createUser } = require("./controlers/user.control");


// =========================
// CORS
// =========================

app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});


// =========================
// Middleware
// =========================

app.use(express.json());


// =========================
// Static uploads
// =========================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uplodes")
    )
);


// =========================
// Routes
// =========================

const profileRouter = require("./router/profile.router");
const projectRouter = require("./router/project.router");
const skillsRouter = require("./router/skill.router");
const educaionRouter = require("./router/educaion.router");
const exprienceRouter = require("./router/exprience.router");
const socialRouter = require("./router/social.router");
const useRouter = require("./router/user.router");
const cvRouter = require("./router/cv.router");


app.use("/profile", profileRouter);
app.use("/project", projectRouter);
app.use("/skills", skillsRouter);
app.use("/educaion", educaionRouter);
app.use("/exprerience", exprienceRouter);
app.use("/social", socialRouter);
app.use("/user", useRouter);
app.use("/cv", cvRouter);


// =========================
// Not Found
// =========================

app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


// =========================
// MongoDB
// =========================

mongoose
    .connect(
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/protfolio"
    )
    .then(async () => {

        console.log("database connected");

        // Create Main Admin + Backup Admin
        await createUser();

        console.log("default admins checked");

    })
    .catch((err) => {

        console.log(
            "database connection error:",
            err
        );

    });


// =========================
// Start Server
// =========================

app.listen(port, () => {

    console.log(
        `server start at port ${port}`
    );

});


exports.app = app;