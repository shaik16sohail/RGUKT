const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig'); // import your cloudinary config

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder: 'Stay_Master', // replace with your folder
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const parser=multer({storage:storage});

module.exports=parser;