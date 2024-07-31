// import packages 
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require("./config");

// User defined routes 
const indexRoutes = require('./routes/indexRoute');
const authRoutes = require('./routes/authRoute');

// Creating an express app
const app = express();

// Set the static files location
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).render('error', { message: 'Something went wrong. Please try again later.', errStack : err.stack });
});

// Server listen
app.listen(config.PORT, () => {
    console.log(`Server is running on port http://localhost:${config.PORT}`);
});
