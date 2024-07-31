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

// Attaching the routes to app.
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// 404 Error handling middleware
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// General error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = status === 404 ? 'Page not found.' : 'Something went wrong. Please try again later.';
    console.error(err.stack); // Log the error stack for debugging
    res.status(status).render('error', { message, errStack: err.stack, status });
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err); // Log the error
    // Consider graceful shutdown here
});

// Server listen
app.listen(config.PORT, () => {
    console.log(`Server is running on port http://localhost:${config.PORT}`);
});
