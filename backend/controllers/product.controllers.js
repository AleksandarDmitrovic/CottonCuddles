import pool from "../db/index.js";

export const getProducts = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    console.log("data :", data);
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    console.error("Error retrieving data from the database", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {};
export const getProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
