import { Router } from "express";
import { ProductManager } from "../src/dao/modelsFileSystem/ProductManager.js";
import MessageManagerMdb from "../src/dao/models/messages.manager.js";

const router = Router();
const pManager = new ProductManager("../productos.json");
const msManager = new MessageManagerMdb()

router.get("/home", (req, res) => {
  let products = pManager.getProducts();
  res.render("home", { productos: products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/messages", (req, res) => {
  res.render("messages", {});
})

export default router;
