const isAdmin = (req, res, next) => {
    if (req.isAdmin === true) {
      next();
    } else {
      return res.status(403).json({ message: "Admin role required" });
    }
  };

  module.exports = {isAdmin};