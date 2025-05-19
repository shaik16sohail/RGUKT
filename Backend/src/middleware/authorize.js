const authorize = (requiredRole) => (req, res, next) => {
  if (req.userType !== requiredRole) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};
module.exports=authorize;
