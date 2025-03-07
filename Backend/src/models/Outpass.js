const mongoose=require("mongoose");

const outpassSchema=new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    destination:{type:String,required:true},
    reason:{type:String,required:true},
    mobileNo: { type: String, required: true },
    parentMobileNo:{type:String,required:true},
    date: { type: Date, required: true },
    type: { type: String, enum: ["normal", "emergency"], required: true,default:"pending" },
    status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
    raisedAt: { type: Date, default: Date.now }

});
module.exports=mongoose.model("Outpass",outpassSchema);