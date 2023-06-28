import { Router } from "express";
import { ProductManager } from "../src/dao/modelsFileSystem/ProductManager.js";
import ProductManagerMdb from "../src/dao/models/product.manager.mdb.js";
import { socketServer } from "../src/app.js";

const router = Router();
const pManagerMDB = new ProductManagerMdb();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let products = await pManagerMDB.getProductsMDB();

    if (!isNaN(limit)) {
      products = products.slice(0, limit);
      return res.send(JSON.stringify(products));
    }

    res.send(JSON.stringify(products));
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productsById = await pManagerMDB.getProductsByIdMDB(id);

    if (productsById) {
      res.status(200).send(productsById);
    } else {
      res.status(404).send(`No product found with id ${id}`);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let addProduct = await pManagerMDB.addProductMDB(body);

    if (addProduct) {
      res.status(200).send("Add product successfully");
    } else {
      res.status(400).send("Fail to add");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.put("/:idUpdate", async (req, res) => {
  try {
    const idUpdate = req.params.idUpdate;  // Usar el mismo nombre de variable "idUpdate"
    const body = req.body;
    const productToUpdate = await pManagerMDB.updateProductMDB(body, idUpdate);

    if (productToUpdate) {
      res.status(200).send(`The product with id ${idUpdate} has been updated successfully`);
    } else {
      res.status(404).send(`There is no product with the id ${idUpdate}`);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/:idDelete", async (req, res) => {
  try {
    const idDelete = req.params.idDelete;  // Usar el mismo nombre de variable "idDelete"
    const productToDelete = await pManagerMDB.deleteProductMDB(idDelete);

    if (productToDelete) {
      res.status(200).send(`The product with id ${idDelete} has been deleted successfully`);
    } else {
      res.status(404).send(`There is no product with the id ${idDelete}`);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});


export default router;

//with file system

// const pManager = new ProductManager("../productos.json");

// router.get("/", (req, res) => {
//   const limit = parseInt(req.query.limit);
//   let products = pManagerMDB.getProducts();
//   if (!isNaN(limit)) {
//     products = products.slice(0, limit);
//     return res.send(JSON.stringify(products));
//   }
//   res.send(JSON.stringify(products));

// });

// router.get("/:id", (req, res) => {
// const idParams = req.params.id;
// let products = pManager.getProductById(idParams);

// if (products) {
//   return res.send(JSON.stringify(products));
// } else {
//   return res.status(404).send("Product not found");
// }
// });

// router.post("/", (req, res) => {
// const {
//   title,
//   description,
//   price,
//   status,
//   stock,
//   category,
//   thumbnails,
//   code,
// } = req.body;

// if(!title, !description, !price, !status, !stock, !category, !thumbnails, !code){
//   return res.status(400).send("You have not completed all the fields")
// }else{
//   pManager.addProduct(
//     title,
//     description,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails,
//     code
//   );
//   const productAdded = pManager.getProducts()
//   socketServer.emit('addProducts', productAdded)
//   pManager.archivarProds();

//   return res.status(200).send("Add product successfully");
// }

// });

// router.put("/:idUpdate", (req, res) => {
// const id = parseInt(req.params.idUpdate);
// const dataUpdate = req.body;
// const updatedProduct = pManager.updateProduct(id, dataUpdate);

// const productAdded = pManager.getProducts()
// socketServer.emit('addProducts', productAdded)
// if (updatedProduct) {
//   pManager.archivarProds();
//   return res.send(updatedProduct);
// } else {
//   return res.send("Product not found");
// }
// });

// router.delete("/:idDelete", (req, res) => {
// const id = parseInt(req.params.idDelete);
// const productDelete = pManager.deleteProduct(id);

// const productAdded = pManager.getProducts()
// socketServer.emit('addProducts', productAdded)
// if (!productDelete) {
//   return res.send("Product not found");
// }

// pManager.archivarProds();
// return res.send("Product deleted successfully");
// });
