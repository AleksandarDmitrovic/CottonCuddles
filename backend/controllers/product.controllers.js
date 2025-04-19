import pool from "../db/index.js";

export const getProducts = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    console.log("data :", data);
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    console.error("Error in getProducts", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
      [name, price, image]
    );

    res.status(201).json({
      success: true,
      message: `Successfully inserted ${name} product into the database`,
      data: newProduct[0],
    });
  } catch (error) {
    console.error("Error in createProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
