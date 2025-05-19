require("dotenv").config();
const express=require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app=express();
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes=require('./src/routes/studentRoutes');
const port=process.env.PORT|| 8080;
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true // Allow cookies to be sent
}));
connectDB();

app.use("/api/auth",authRoutes);
app.use("/student",studentRoutes);


app.listen(port,()=>{
    console.log("server is running");
})