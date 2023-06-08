import { Router } from "express";
import { ProductManager } from "../src/ProductManager.js";
import { socketServer } from "../src/app.js";

const router = Router();
const pManager = new ProductManager("../productos.json");

router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit);
    let products = pManager.getProducts();
    if (!isNaN(limit)) {
      products = products.slice(0, limit);
      return res.send(JSON.stringify(products));
    }
    res.send(JSON.stringify(products));

});

router.get("/:id", (req, res) => {
  const idParams = req.params.id;
  let products = pManager.getProductById(idParams);

  if (products) {
    return res.send(JSON.stringify(products));
  } else {
    return res.status(404).send("Product not found");
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails,
    code,
  } = req.body;

  if(!title, !description, !price, !status, !stock, !category, !thumbnails, !code){
    return res.status(400).send("You have not completed all the fields")
  }else{
    pManager.addProduct(
      title,
      description,
      price,
      status,
      stock,
      category,
      thumbnails,
      code
    );
    const productAdded = pManager.getProducts()
    socketServer.emit('addProducts', productAdded)
    pManager.archivarProds();
  
    return res.status(200).send("Add product successfully");
  }


});

router.put("/:idUpdate", (req, res) => {
  const id = parseInt(req.params.idUpdate);
  const dataUpdate = req.body;
  const updatedProduct = pManager.updateProduct(id, dataUpdate);

  const productAdded = pManager.getProducts()
  socketServer.emit('addProducts', productAdded)
  if (updatedProduct) {
    pManager.archivarProds();
    return res.send(updatedProduct);
  } else {
    return res.send("Product not found");
  }
});

router.delete("/:idDelete", (req, res) => {
  const id = parseInt(req.params.idDelete);
  const productDelete = pManager.deleteProduct(id);

  const productAdded = pManager.getProducts()
  socketServer.emit('addProducts', productAdded)
  if (!productDelete) {
    return res.send("Product not found");
  }

  pManager.archivarProds();
  return res.send("Product deleted successfully");
});



export default router;
