const parser = require("../config/cloudinaryMulter");

const pareserMiddleware=(req,res,next)=>{
    parser.single('image')(req, res, (err) => {
    if (err) {
      console.log("❌ Multer/Cloudinary error:");
      if (typeof err === 'object') {
        console.log(JSON.stringify(err, null, 2));
      } else {
        console.log(err);
      }
      return res.status(400).json({ message: "Image upload failed", error: err.message || err.toString() });
    }
    next();
  });
};
module.exports=pareserMiddleware;