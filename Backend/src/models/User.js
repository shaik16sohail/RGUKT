const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },password:{
        type: String,
        required: true
    },phone:{
        type: String
    },userType: { 
        type: String, 
        enum: ["student", "caretaker", "warden", "security", "admin"], 
        // required: true 
      },
      hostelName: { type: String },
      createdAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model("User",userSchema);