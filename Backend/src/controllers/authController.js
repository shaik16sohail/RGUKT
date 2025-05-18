const Otp=require("../models/Otp");
const User=require('../models/User');
const nodemailer=require('nodemailer');
const bcrypt=require('bcrypt');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  }
});

const sendOtp=async (req,res)=>{
  const {email}=req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  try{
    await Otp.deleteMany({ email }); // clear old OTPs
    await Otp.create({ email, otp: otpCode });
    console.log(email,otpCode);
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is ${otpCode}</h3>`
    });

    res.status(200).json({ message: "OTP sent successfully" });
  }catch(err){
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

const verifyOtp=async (req,res)=>{
  const {email,otp}=req.body;
  const validOtp=await Otp.findOne({email,otp});

  if(!validOtp){
    return res.status(400).json({ error: "Invalid or expired OTP" });

  }
  await Otp.deleteMany({email});
  res.status(200).json({message:"Otp Verified"});
}

const register=async (req,res)=>{
  try {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  console.log("User created:", newUser);
  res.status(201).json({ message: "User created successfully" });

} catch (err) {
  console.error("Registration error:", err);
  res.status(500).json({ error: err.message });
}

};

// /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  console.log("user",user);
  if (!user) return res.status(404).json({ message: 'User not found' })

  const isMatch = await bcrypt.compare(password, user.password)
  console.log(isMatch);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' })

  // proceed with generating JWT or setting session
  res.status(200).json({ message: 'Login successful', user })
}





module.exports={sendOtp,verifyOtp,register,loginUser};