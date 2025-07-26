const mongoose=require('mongoose');

const caretakerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    hostelName:{type:String},
    issuesResolved: { type: Number, default: 0 },
    outpassesApproved: { type: Number, default: 0 },
    feedbackRating: { 
        totalRating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 }
    }
});

module.exports=mongoose.model("Caretaker",caretakerSchema);