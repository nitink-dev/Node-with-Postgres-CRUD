// Create an Express server
import express from "express";
// Import db.js file for connecting
import pool from "./config/db.js";
// Import CORS for cross-origin requests
import cors from "cors";
// Import dotenv to get data from .env file
import dotenv from "dotenv";

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test POSTGRES connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection failed");
  }
});

// Use process.env to get port from .env or default to 3001
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
