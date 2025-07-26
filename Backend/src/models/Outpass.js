const mongoose=require("mongoose");

const locationSchema=new mongoose.Schema({
    latitude:{type:Number,required:true},
    longitude:{type:Number,required:true},
    timestamp:{type:Date,default:Date.now},
});
const outpassSchema=new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    destination:{type:String,required:true},
    reason:{type:String,required:true},
    mobileNo: { type: String, required: true },
    parentMobileNo:{type:String,required:true},
    hostelName:{type:String},
    date: { type: Date},
    type: { type: String, enum: ["normal", "emergency"], required: true,default:"normal" },
    status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
    raisedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null},
    locations:[locationSchema],
    caretakerId:{type:mongoose.Schema.Types.ObjectId,ref:"Caretaker"},
    feedbackGiven: { type: Boolean, default: false }

});

outpassSchema.index({ completedAt: 1 }, { expireAfterSeconds: 86400 }); // 86400 = 24 hrs
module.exports=mongoose.model("Outpass",outpassSchema);