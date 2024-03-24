const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwtConfig");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: 'Auth header missing' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, jwtConfig.secret, (error, decoded) => {
    if (error) {
      res.status(401).json({ message: error.message });
    } else {
      req.userId = decoded.Id;
      req.isAdmin = decoded.IsAdmin;
      next();
    }
  });
};

module.exports = { verifyToken };