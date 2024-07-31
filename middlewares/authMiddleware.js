const jwt = require('jsonwebtoken');
const config = require("../config");
// Authenticate user using cookie
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {

        return res.redirect('/auth/login');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};
