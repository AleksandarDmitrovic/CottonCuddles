import pool from "../db/index.js";

export const getProducts = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    console.log("data :", data);
    res.status(200).json({ success: true, data: data.rows });
    res.status(200).send(data.rows);
  } catch (error) {
    console.error("Error retrieving data from the database", error);
  }
};

export const createProduct = async (req, res) => {};
export const getProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
