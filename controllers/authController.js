const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");

const users = []; // In-memory user store

exports.renderRegister = (req, res) => {
  res.render('register', { user: null });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ name, email, password: hashedPassword });
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};

exports.renderLogin = (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email == email);

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
