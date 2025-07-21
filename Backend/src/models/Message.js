const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    hostelName:String,
    senderName:String,
    message:String,
    imageUrl: {
        type: String,
        default: ""
    },
    isImage: {
        type: Boolean,
        default: false
    },
    timestamp:{type:Date,default:Date.now},
    pinned: { type: Boolean, default: false }
});

module.exports=mongoose.model("Message",messageSchema);