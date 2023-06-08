import { Router } from "express";
import { ProductManager } from "../src/ProductManager.js";

const router = Router();
const pManager = new ProductManager("../productos.json");

router.get("/home", (req, res) => {
  let products = pManager.getProducts();
  res.render("home", { productos: products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

export default router;
