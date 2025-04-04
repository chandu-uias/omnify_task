const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);

const MONGO_URL=process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(()=>{
    console.log("Mongodb connected!");
}).catch((err)=>{
    console.log(err);
})