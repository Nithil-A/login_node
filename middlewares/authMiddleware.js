const jwt = require('jsonwebtoken');
const config = require("../config");
// const userModel = require("../database/postgressSql/connection");
// Authenticate user using cookie
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {

        return res.redirect('/auth/login');
      } else {
        // Get data from postgress db.
        // req.user = await userModel.findUserByUsername(decoded.email);
        req.user = decoded;
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};

// module.exports = authenticateJWT;
