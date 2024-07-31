
const dotenv = require("dotenv");
const path = require("path");

// Dynamic environment file configuration 
dotenv.config({
    path: path.resolve(__dirname, `env/${process.env.NODE_ENV}.env`)
});

module.exports = {
    PORT : process.env.PORT,    
    JWT_SECRET : process.env.JWT_SECRET,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    DB_NAME : process.env.DB_NAME,
}