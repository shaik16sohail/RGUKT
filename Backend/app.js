require("dotenv").config();
const express=require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app=express();
const authRoutes = require("./src/routes/authRoutes");
const port=process.env.PORT|| 8080;
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true // Allow cookies to be sent
}));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.use("/api/auth", authRoutes);


main()
    .then(() => {
         console.log("Connected to MongoDB Atlas");
     })
    .catch((err) => console.log(err));



app.listen(port,()=>{
    console.log("server is running");
})