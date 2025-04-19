import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/product.routes.js";
import pool from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
// Helmet is a security middleware that helps you protect your Express apps by setting various HTTP headers
app.use(morgan("dev"));
// Log the requests to the console

app.use("/api/products", productRoutes);

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * from products");
    res.status(200).send(data.rows);
  } catch (error) {
    console.error("Error recieving data from the database", error);
  }
});

app.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO products (name) VALUES ($1)", [name]);
    res.status(200).send({
      message: `Successfully inserted ${name} product into the database`,
    });
  } catch (error) {
    console.error("Error inserting data into the database", error);
  }
});

app.get("/setup", async (res, req) => {
  try {
    await pool.query(
      "DROP TABLE IF EXISTS products CASCADE; CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
    );
    console.log("Table created successfully");
    res.status(200).send({ message: "Table created successfully" });
  } catch (error) {
    console.error("Error setting up the database", error);
    // res.status(500).send("Error setting up the database");
  }
});

// const initDB = async () => {
//   // Initialize the database connection here
//  try{
//   await db
//  }
//   console.log("Database initialized");
// }

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
