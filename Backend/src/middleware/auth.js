const jwt=require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token =
      req.cookies.authToken || req.headers.authorization?.split(" ")[1];
    console.log("token",token);
    if (!token) {
      return res.status(401).json({
        message: "Provide Token",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;
    req.userType=decode.userType;

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Unauthorized",
      error: true,
      success: false,
    });
  }
};

module.exports={auth};
