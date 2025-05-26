const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  category: { 
    type: String, 
    enum: ["Electricity","Sanitation","Drinking_Water","Others"], 
    required: true 
  },
  description: { type: String, required: true },
  photo: { type: String }, // Store image URL if uploaded
  status: { 
    type: String, 
    enum: ["pending", "rejected", "resolved"], 
    default: "pending" 
  },
  comment:{
    type:String,
  },
  hostelName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Issue", issueSchema);
