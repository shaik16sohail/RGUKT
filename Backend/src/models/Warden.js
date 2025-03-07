const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:String},

  hostelName: { type: String, required: true },
  totalStudents: { type: Number, default: 0 },
  caretakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Caretaker" }]
});

module.exports = mongoose.model("Warden", wardenSchema);