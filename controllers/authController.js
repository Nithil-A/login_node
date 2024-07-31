const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");
// Postgress db
const userModel = require("../models/userModel");

const users = []; // In-memory user store
// Render registration page
exports.renderRegister = (req, res) => {
  res.render('register', { user: null });
};
// Register user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ name, email, password: hashedPassword });

    // add data to db using postgress 
    // const user = await userModel.createUser(name, email, hashedPassword);

    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};
// Render login page
exports.renderLogin = (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
};
// Login 
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email == email);

    // Find user data from postgress db
    // const user = await userModel.findUserByUsername(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email }, config.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
};
// Log out user - remove cookie
exports.logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.redirect('/auth/login');
  } catch (err) {
    next(err);
  }
};

exports.renderUserDetails = (req, res) => {
  let userData = users.find(item => item.email == req.user.email);
  res.render('index', { user: userData });
};

exports.renderEditUser = (req, res) => {
  let userData = users.find(item => item.email == req.user.email);
  res.render('register', { user: userData });
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = users.find(u => u.email == req.user.email);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password ? await bcrypt.hash(password, 10) : user.password;
      res.redirect('/');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// module.exports = {
//   register,
//   login
// };
