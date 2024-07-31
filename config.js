
const dotenv = require("dotenv");
const path = require("path");

// Dynamic environment file configuration 
dotenv.config({
    path: path.resolve(__dirname, `env/${process.env.NODE_ENV}.env`)
});

module.exports = {
    PORT : process.env.PORT,    
    JWT_SECRET : process.env.JWT_SECRET
}