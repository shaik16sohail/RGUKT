require("dotenv").config();
const express=require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app=express();
const Stripe = require('stripe');
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes=require('./src/routes/studentRoutes');
const caretakerRoutes=require('./src/routes/caretakerRoutes');
const wardenRoutes=require('./src/routes/wardenRoutes');
const paymentRoutes=require('./src/routes/payment');
const port=process.env.PORT|| 8080;
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const mongoose=require('mongoose');
const QRCode = require('qrcode');
const axios=require('axios');
const jwt = require('jsonwebtoken');
const Outpass = require("./src/models/Outpass");
const transporter = require("./src/utils/transporter");
const tempFormData = require("./src/utils/tempFormData");
const User = require("./src/models/User");
const Student = require("./src/models/Student");
const generateQRCode = require("./src/utils/qrGenerator");
const Message = require("./src/models/Message");
const pareserMiddleware = require("./src/middleware/parserMiddleware");
const Caretaker = require("./src/models/Caretaker");
const Issue = require("./src/models/Issue");
const Face = require("./src/models/Face");
const Outsider = require("./src/models/Outsider");
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://security-v5vz.vercel.app"
    ];

    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

connectDB();

app.use("/api/auth",authRoutes);
app.use("/student",studentRoutes);
app.use("/caretaker",caretakerRoutes);
app.use("/warden",wardenRoutes);
app.use("/api/payment",paymentRoutes);
// Add to your main Express server file (e.g., app.js or index.js)
app.get('/track', (req, res) => {
  const { studentId, outpassId } = req.query;

  if (!studentId || !outpassId) {
    return res.status(400).send('Missing studentId or outpassId');
  }
  const appLink = `myapp://track?studentId=${studentId}&outpassId=${outpassId}`;
  res.redirect(appLink);
});

app.post('/feedback/outpass',async(req,res)=>{
  const { outpassId, rating } = req.body;
  if (!outpassId || !rating) {
    return res.status(400).json({ error: 'Missing outpassId or rating' });
  }
  try{
    const OutpassData=await Outpass.findOne({_id:outpassId});
    const caretakerId=OutpassData.caretakerId;

    await Caretaker.findByIdAndUpdate(
  caretakerId,
  {
    $inc: {
      "feedbackRating.totalRating": rating,
      "feedbackRating.ratingCount": 1
    }
  }
  );
  await Outpass.findByIdAndUpdate(outpassId,{$set:{feedbackGiven:true}});
  res.status(200).json({ message: "success" });
  }catch(err){
    console.log(err);
    res.status(404).json({error:"something went wrong"});
  }
  

});

app.post('/feedback/issue',async(req,res)=>{
  const { issueId, rating } = req.body;
  if (!issueId || !rating) {
    return res.status(400).json({ error: 'Missing issueId or rating' });
  }
  try{
    const issueData=await Issue.findOne({_id:issueId});
    const caretakerId=issueData.caretakerId;

    await Caretaker.findByIdAndUpdate(
  caretakerId,
  {
    $inc: {
      "feedbackRating.totalRating": rating,
      "feedbackRating.ratingCount": 1
    }
  }
  );
  await Issue.findByIdAndUpdate(issueId,{$set:{feedbackGiven:true}});
  res.status(200).json({ message: "success" });
  }catch(err){
    console.log(err);
    res.status(404).json({error:"something went wrong"});
  }
  

});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  let mailOptions={
      from:process.env.MAIL,
      to:process.env.TOMAIL,
      subject:'',
      html:'',
    };
  if (event.type === 'checkout.session.completed'){
    const session = event.data.object;
    const formData = tempFormData[session.id];
    const userId = session.metadata.userId;
    console.log("formData in app.js",formData);
    console.log(session.metadata);
    try {
      const userData = await User.findOne({ _id: userId });
      // console.log(userId);
      if (!userData) {
        console.error("❌ User not found");
        return;
      }

      const studentData = await Student.findOne({ email: userData.email });
      if (!studentData) {
        console.error("❌ Student not found");
        return;
      }

      const { reason, destination, studentMobile, parentMobile} = formData;

      const newOutpass = new Outpass({
        studentId: studentData._id,
        reason,
        destination,
        mobileNo: studentMobile,
        parentMobileNo: parentMobile,
        type: "emergency",
        status: "approved",
        hostelName: studentData.hostelName
      });

      const generatedOne= await newOutpass.save();
      console.log('✅ Outpass saved:', newOutpass);
      const qrCodeUrl=await generateQRCode(generatedOne._id.toString());
            const qrBuffer=await QRCode.toBuffer(generatedOne._id.toString());
            mailOptions.subject='Your Outpass request is Approved Successfully';
            mailOptions.html=`<p>Your Outpass QR Code:</p><img src="${qrCodeUrl}" alt="QR Code" />`;
            mailOptions.attachments = [
              {
                filename: 'qrcode.png',
                content: qrBuffer,
                cid: 'qrcode'
              }
            ];
            await transporter.sendMail(mailOptions);
      delete tempFormData[session.id];

    } catch (error) {
      console.error("❌ Error saving Outpass:", error.message);
    }
  }
  res.status(200).end();
});

app.get('/api/messages/:hostelName', async (req, res) => {
    const messages = await Message.find({ hostelName: req.params.hostelName }).sort({ timestamp: 1 });
    res.json(messages);
});

app.get('/api/reverse-geocode',async(req,res)=>{
  const {lat,lon}=req.query;
  if(!lat || !lon) return res.status(400).json({message:"lat and lon required"});
  try{
    const response=await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon,
        format: 'json'
      },
      headers: {
        'User-Agent': 'YourAppName/1.0' // Nominatim requires this
      }
    });
    res.json({address:response.data.display_name});
  }catch(err){
    console.error(err.message);
    res.status(500).json({message:"Reverse geocoding failed"});
  }
});

app.post("/api/scan/",async(req,res)=>{
  let mailOptions={
      from:process.env.MAIL,
      to:process.env.TOMAIL,
      subject:'',
      html:'',
    };
  try{
    const {outpassId}=req.body;
    const objectId = new mongoose.Types.ObjectId(outpassId);
    const outpassData=await Outpass.findOne({_id:objectId});
    const studentId=outpassData.studentId;
    const studentData=await Student.findOne({_id:studentId});
    if(outpassData && outpassData.status=='approved'){
      outpassData.status = "completed";
     
      outpassData.completedAt = new Date(); // Add this field in your schema
      await outpassData.save();

      const tokenPayload={studentId:outpassData.studentId,outpassId:outpassData._id};
      const token=jwt.sign(tokenPayload,process.env.JWT_SECRET,{expiresIn:'24h'});
      const qrCodeDataURL=await QRCode.toDataURL(token);
      const redirectLink = `https://9b6493760c9e.ngrok-free.app/track?studentId=${outpassData.studentId}&outpassId=${outpassId}`;
      mailOptions.subject = 'Start Location Sharing';
      // mailOptions.to=studentData.email;
      mailOptions.html = `
        <p>studentId-${outpassData.studentId}</p>
        <p>ObjectId-${outpassId}</p>
      `;
      await transporter.sendMail(mailOptions);
      res.status(200).json({message:"success",qrcode:qrCodeDataURL,token,id:studentData.id});
    }else if(outpassData && outpassData.status=='completed'){
      res.status(201).json({message:"outpass is already used bro"});
    }else {
      res.status(404).json({ message: "outpass not found" });
    }
    
  }catch(err){
    console.log(err);
    res.status(500).json({message:"error"});
  }
  
});
app.post("/api/location",async(req,res)=>{
  try{
    const {outpassId,latitude,longitude}=req.body;
    if(!outpassId || !longitude ||!latitude)
      return res.status(400).json({error:"Missing required fields"});
    const outpass=await Outpass.findById(outpassId);
    if(!outpass)
      return res.status(404).json({error:"Outpass not found"});
    const newLocation={
      latitude,longitude,
      timestamp:new Date(),
    };
    outpass.locations.push(newLocation);
    await outpass.save();
    console.log("Location saved for outpass",outpassId);
    res.json({message:"Location stored in DB"});

  }catch(err){
    console.log("error",err);
    res.status(500).json({error:"Internal server error"});
  }
});
app.post("/api/upload",pareserMiddleware,(req,res)=>{
  if(!req.file || !req.file.path)
      return res.status(400).json({ message: 'Image upload failed'});
  res.json({ imageUrl: req.file.path });
});


// Register Face API
app.post('/api/register-face', async (req, res) => {
  const { studentId, descriptor } = req.body;
  const existing = await Face.findOne({ id:studentId });

  if (existing) {
    existing.faceDescriptor = descriptor;
    await existing.save();
  } else {
    await Face.create({ id:studentId, faceDescriptor: descriptor });
  }

  res.json({ message: 'Face saved!' });
});

// Compare Face API
app.post('/api/verify-face', async (req, res) => {
  console.log("verifying..");
  const { studentId, descriptor } = req.body;

  const student = await Face.findOne({ id:studentId });
  const studentData=await Student.findOne({id:studentId});
  if (!student) return res.status(404).json({ match: false });

  const stored = student.faceDescriptor;
  const distance = euclideanDistance(stored, descriptor);

  const threshold = 0.6;
  console.log("almost done");
  res.json({ match: distance < threshold,name:studentData.name });
});

function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}
app.post("/api/enterdata",async(req,res)=>{
  let mailOptions={
    from:process.env.MAIL,
    to:'shaik16sohail@gmail.com',
    subject:'',
    html:'',
  };
  try{
    const response=await Outsider.create(req.body)
    const id=response._id;
    const qrCodeUrl=await generateQRCode(id.toString());
    const qrBuffer=await QRCode.toBuffer(id.toString());
    mailOptions.subject='Welcome to RGUKT-RKVALLEY';
    mailOptions.html=`<p>Please show this qrcode to security at the time of leaving the campus</p>`;
    mailOptions.attachments = [
    {
      filename: 'qrcode.png',
      content: qrBuffer,
      cid: 'qrcode'
    }
    ];
    await transporter.sendMail(mailOptions);
    res.status(200).json({message:"success"});

  }catch(err){
    console.log(err);
    res.status(400).json({message:"Something went wrong"});
  }
});
app.post("/api/exitscan",async(req,res)=>{
  const {outsiderId}=req.body;
  try{
    const msg=await Outsider.deleteOne({_id:outsiderId});
    res.status(200).json({message:"You can leave the campus now"});
  }catch(err){
    console.log(err);
    res.status(400).json({message:"Something went wrong"});
  }
});
module.exports=app;