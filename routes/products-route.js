import { Router } from "express";
import { ProductManager } from "../src/ProductManager.js";

const router = Router();
const pManager = new ProductManager("../productos.json");

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  let products = pManager.getProducts();

  if (!isNaN(limit)) {
    products = products.slice(0, limit);
  }

  res.send(JSON.stringify(products));
});

router.get("/:id", (req, res) => {
  const idParams = req.params.id;
  let products = pManager.getProductById(idParams);

  if (products) {
    res.send(JSON.stringify(products));
  } else {
    res.status(404).send("Product nt found");
  }
});

router.post("/", (req, res) => {
  const {title, description, price, status, stock, category, thumbnails, code} = req.body;

  pManager.addProduct(title,description,price,status,stock,category,thumbnails,code);
  pManager.archivarProds();

  res.send("Add product successfully");
});

router.put("/:idUpdate", (req, res) => {
  const id = parseInt(req.params.idUpdate);
  const dataUpdate = req.body;
  const updatedProduct = pManager.updateProduct(id, dataUpdate);

  if (updatedProduct) {
    pManager.archivarProds();
    res.send(updatedProduct);
  } else {
    res.send("Product nt found");
  }
});

router.delete("/:idDelete", (req, res) => {
    const id = parseInt(req.params.idDelete);
    const productDelete = pManager.deleteProduct(id);

    if (!productDelete) {
        res.send("Product not found");
    }

    pManager.archivarProds();
    res.send("Product deleted successfully");
});


export default router;