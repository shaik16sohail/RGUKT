const mongoose=require('mongoose');
const outsiderSchema=new mongoose.Schema({
    name:String,
    studentId:String,
    email:String,
    mobile:String,
    members:Number,
    vehicle:String,
});

module.exports=mongoose.model("Outsider",outsiderSchema);