const { Pool } = require('pg');
const config = require("../../config");
// Connecting to postgress db
const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

// Create a table if the table is not alredy excist.
const createTableIfNotExists = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("Users table is ready.");
  } catch (err) {
    console.error("Error creating users table:", err);
  }
};

createTableIfNotExists();

module.exports = pool;
