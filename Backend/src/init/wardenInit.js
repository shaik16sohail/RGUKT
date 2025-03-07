require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");

const Warden=require('../models/Warden');
if (!process.env.MONGO_URL) {
    console.error(" MONGO_URL is not defined. Check your .env file.");
    process.exit(1); // Exit process if MONGO_URL is missing
  }
async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  await initDb();

    // Close the connection after seeding data
    await mongoose.connection.close();
    console.log("🚪 MongoDB connection closed.");
  
}
main()
    .then(() => {
         console.log("Connected to MongoDB Atlas");
     })
    .catch((err) => console.log(err));

    
const users=[
    {name:"Ramu",email:"bh1front@rguktrkv.ac.in",phone:"7891234269",hostelName:"BH-1-Front"},
    {name:"Ramesh",email:"bh1back@rguktrkv.ac.in",phone:"7897894269",hostelName:"BH-1-Back"},
    {name:"Tiwari",email:"bh2front@rguktrkv.ac.in",phone:"789123729",hostelName:"BH-2-Front"},
    {name:"Konappa",email:"bh2back@rguktrkv.ac.in",phone:"6915294269",hostelName:"BH-2-Back"},
    {name:"Vimala",email:"gh1@rguktrkv.ac.in",phone:"7891234269",hostelName:"GH-1"},
    {name:"Shamshad",email:"gh2@rguktrkv.ac.in",phone:"6127894269",hostelName:"GH-2"},

];

const initDb=async()=>{
    await Warden.deleteMany({});
    console.log("All users deleted successfully ❌");
    
    await Warden.insertMany(users);
    console.log("data was initialized successfully");
};
