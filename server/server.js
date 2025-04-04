const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db");
const mongoose = require("mongoose");
require('dotenv').config();

const cors = require("cors");

const app = express();

// app.use(cors());
app.use(
    cors({
        //origin: "https://doctor-appointment-z2xh.vercel.app", 
        origin:"*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true 
    })
);

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});



app.listen(5001, () => console.log("app started at 5001..."));
