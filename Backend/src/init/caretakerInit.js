require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");

const Caretaker=require('../models/Caretaker');
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
    {name:"Prasad",email:"Prasad@rguktrkv.ac.in",phone:"8903489790",hostelName:"BH-2-Back"},
    {name:"Mahesh",email:"Mahesh@rguktrkv.ac.in",phone:"8803489790",hostelName:"BH-2-Back"},
    {name:"HariSiva",email:"Harisiva@rguktrkv.ac.in",phone:"8903649790",hostelName:"BH-2-Front"},
    {name:"Nagarjuna",email:"Nagarjuna@rguktrkv.ac.in",phone:"8800489790",hostelName:"BH-2-Front"},
    {name:"Nagaraju",email:"Nagaraju@rguktrkv.ac.in",phone:"8903909790",hostelName:"BH-1-Back"},
    {name:"Ghouse",email:"Ghouse@rguktrkv.ac.in",phone:"8803489780",hostelName:"BH-1-Back"},
    {name:"Khaleel",email:"Khaleel@rguktrkv.ac.in",phone:"8643649790",hostelName:"BH-1-Front"},
    {name:"AnilKumar",email:"Anila@rguktrkv.ac.in",phone:"8800489830",hostelName:"BH-1-Front"},
    {name:"Uma",email:"Uma@rguktrkv.ac.in",phone:"8903489870",hostelName:"GH-2"},
    {name:"Bhavana",email:"Bhavana@rguktrkv.ac.in",phone:"8803929790",hostelName:"GH-2"},
    {name:"Mallika",email:"Mallika@rguktrkv.ac.in",phone:"8903649790",hostelName:"GH-1"},
    {name:"SaiSree",email:"SaiSree@rguktrkv.ac.in",phone:"9824819790",hostelName:"GH-1"},
];

const initDb=async()=>{
    await Caretaker.deleteMany({});
    console.log("All users deleted successfully ❌");
    
    await Caretaker.insertMany(users);
    console.log("data was initialized successfully");
};
// initDb();