require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");

const Student=require('../models/Student');
if (!process.env.MONGO_URL) {
    console.error("❌ MONGO_URL is not defined. Check your .env file.");
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
    {name:"sohail",email:"rr200088@rguktrkv.ac.in",id:"R200088",phone:"8790345569",hostelName:"BH-2",roomNo:"S78"},
    {name:"rafiq",email:"rr200256@rguktrkv.ac.in",id:"R200256",phone:"8790345669",hostelName:"BH-2",roomNo:"S80"},
    {name:"abdul samad",email:"rr220638@rguktrkv.ac.in",id:"R220638",phone:"9090345569",hostelName:"BH-1",roomNo:"T68"},
    {name:"nasa",email:"rr200094@rguktrkv.ac.in",id:"R200094",phone:"8790235569",hostelName:"GH-2",roomNo:"F45"},
    {name:"komli",email:"rr200280@rguktrkv.ac.in",id:"R200280",phone:"8790344269",hostelName:"GH-1",roomNo:"G69"},
];

const initDb=async()=>{
    await Student.deleteMany({});
    console.log("All users deleted successfully ❌");
    
    await Student.insertMany(users);
    console.log("data was initialized successfully");
};
// initDb();