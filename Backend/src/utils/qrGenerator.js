const QRCode=require('qrcode');

const generateQRCode=async(text)=>{
    try{
        const qrDataUrl=await QRCode.toDataURL(text);
        return qrDataUrl;
    }catch(err){
        throw err;
    }
}
module.exports=generateQRCode;