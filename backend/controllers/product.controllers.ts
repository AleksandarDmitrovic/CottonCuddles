import pool from "../db/index";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
    console.log("data :", data);
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    console.error("Error in getProducts", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return;
  }

  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
      [name, price, image],
    );

    res.status(201).json({
      success: true,
      message: `Successfully inserted ${name} product into the database`,
      data: newProduct.rows[0],
    });
  } catch (error) {
    console.error("Error in createProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
    console.log("data :", data);
    if (data.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    console.error("Error in getProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const data = await pool.query(
      "UPDATE products SET name=$1, price=$2, image=$3 WHERE id=$4 RETURNING *",
      [name, price, image, id],
    );

    if (data.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Successfully updated product ${name}`,
      data: data.rows[0],
    });
  } catch (error) {
    console.error("Error in updateProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id],
    );

    if (data.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    const { name } = data.rows[0];
    res.status(200).json({
      success: true,
      message: `Successfully deleted product ${name} with id ${id}`,
      data: data.rows[0],
    });
  } catch (error) {
    console.error("Error in deleteProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
