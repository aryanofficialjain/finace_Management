const authMiddleware = (req, res, next) => {
  if (process.env.BYPASS_AUTH === "true") {
    req.user = {
      id: "test_user_001",
      email: "test@playstore.com"
    };
    return next();
  }
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required" });
  }
  
  next();
};

export default authMiddleware;
