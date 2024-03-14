const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwtConfig");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

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

const isAdmin = (req, res, next) => {
  if (req.isAdmin === true) {
    next();
  } else {
    return res.status(403).json({ message: "Admin role required" });
  }

};

module.exports = { verifyToken, isAdmin };