const mongoose=require('mongoose');


const faceSchema=new mongoose.Schema({
  id:{type:String,required:true,unique:true},
  faceDescriptor: [Number],
});

module.exports = mongoose.model("Face", faceSchema);