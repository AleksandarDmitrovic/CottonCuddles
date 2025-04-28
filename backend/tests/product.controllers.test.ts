import { Request, Response } from "express";
import { createProduct, getProducts } from "../controllers/product.controllers";
import pool from "../db";

describe("Product Controller", () => {
  describe("createProduct", () => {
    it("should return 400 if required fields are missing", async () => {
      const req = {
        body: { name: "Test Product", price: null, image: null },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "All fields are required",
      });
    });

    // it("should return 201 and the created product on success", async () => {
    //   const req = {
    //     body: { name: "Test Product", price: 100, image: "test.jpg" },
    //   } as Request;
    //   const res = {
    //     status: jest.fn().mockReturnThis(),
    //     json: jest.fn(),
    //   } as unknown as Response;

    //   jest.spyOn(pool, "query").mockResolvedValueOnce({
    //     rows: [{ id: 1, name: "Test Product", price: 100, image: "test.jpg" }],
    //   } as {
    //     rows: { id: number; name: string; price: number; image: string }[];
    //   });

    //   await createProduct(req, res);

    //   expect(res.status).toHaveBeenCalledWith(201);
    //   expect(res.json).toHaveBeenCalledWith({
    //     success: true,
    //     message: "Successfully inserted Test Product product into the database",
    //     data: { id: 1, name: "Test Product", price: 100, image: "test.jpg" },
    //   });
    // });
  });

  // describe("getProduct", () => {
  //   it("should return 404 if product is not found", async () => {
  //     const req = { params: { id: "1" } } as unknown as Request;
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     jest.spyOn(pool, "query").mockResolvedValueOnce({ rowCount: 0 } as any);

  //     await getProduct(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: false,
  //       message: "Product not found",
  //     });
  //   });

  //   it("should return 200 and the product on success", async () => {
  //     const req = { params: { id: "1" } } as unknown as Request;
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     jest.spyOn(pool, "query").mockResolvedValueOnce({
  //       rowCount: 1,
  //       rows: [{ id: 1, name: "Test Product", price: 100, image: "test.jpg" }],
  //     });

  //     await getProduct(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: true,
  //       data: [{ id: 1, name: "Test Product", price: 100, image: "test.jpg" }],
  //     });
  //   });
  // });

  // describe("updateProduct", () => {
  //   it("should return 404 if product is not found", async () => {
  //     const req = {
  //       params: { id: "1" },
  //       body: { name: "Updated Product", price: 150, image: "updated.jpg" },
  //     } as unknown as Request;
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     jest.spyOn(pool, "query").mockResolvedValueOnce({ rowCount: 0 });

  //     await updateProduct(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: false,
  //       message: "Product not found",
  //     });
  //   });

  //   it("should return 200 and the updated product on success", async () => {
  //     const req = {
  //       params: { id: "1" },
  //       body: { name: "Updated Product", price: 150, image: "updated.jpg" },
  //     } as unknown as Request;
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     jest.spyOn(pool, "query").mockResolvedValueOnce({
  //       rowCount: 1,
  //       rows: [
  //         { id: 1, name: "Updated Product", price: 150, image: "updated.jpg" },
  //       ],
  //     });

  //     await updateProduct(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: true,
  //       message: "Successfully updated product Updated Product",
  //       data: {
  //         id: 1,
  //         name: "Updated Product",
  //         price: 150,
  //         image: "updated.jpg",
  //       },
  //     });
  //   });
  // });

  // describe("deleteProduct", () => {
  //   it("should return 404 if product is not found", async () => {
  //     const req = { params: { id: "1" } } as unknown as Request;
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     jest.spyOn(pool, "query").mockResolvedValueOnce({ rowCount: 0 });

  //     await deleteProduct(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: false,
  //       message: "Product not found",
  //     });
  //   });

  //   it("should return 200 and the deleted product on success", async () => {
  //     const req = { params: { id: "1" } } as unknown as Request;
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     } as unknown as Response;

  //     jest.spyOn(pool, "query").mockResolvedValueOnce({
  //       rowCount: 1,
  //       rows: [
  //         { id: 1, name: "Deleted Product", price: 100, image: "deleted.jpg" },
  //       ],
  //     });

  //     await deleteProduct(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: true,
  //       message: "Successfully deleted product Deleted Product with id 1",
  //       data: {
  //         id: 1,
  //         name: "Deleted Product",
  //         price: 100,
  //         image: "deleted.jpg",
  //       },
  //     });
  //   });
  // });
});
