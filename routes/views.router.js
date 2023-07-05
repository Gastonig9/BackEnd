import { Router } from "express";
// import { ProductManager } from "../src/dao/modelsFileSystem/ProductManager.js";
import MessageManagerMdb from "../src/dao/models/messages.manager.js";
import ProductManagerMdb from "../src/dao/models/product.manager.mdb.js";
import CartManagerMdb from "../src/dao/models/cart.manager.mdb.js";

const router = Router();
// const pManager = new ProductManager("../productos.json");

const msManager = new MessageManagerMdb()
const pManagerMDB = new ProductManagerMdb()
const cManagerMDB = new CartManagerMdb()

router.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const sort = req.query.sort;
  const query = req.query.query;

  let products = await pManagerMDB.getProductsMDB(limit, page, sort, query);
  console.log(products);
  let productsJSON = products.docs.map(p => p.toJSON());

  const context = {
    productos: products,
    productosDocs: productsJSON
  };

  res.render("products", context);
});

router.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid
    let productId = await pManagerMDB.getProductsByIdMDB(pid)

    if(productId) {
      res.render("product-detail", {produDetail: productId.toJSON()})
    }else {
      res.status(404).send("Product not found");
    }

  } catch (error) {
    res.status(500).send("Interval server error" + error)
  }

})

router.get("/viewcart/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cManagerMDB.getProductsCartIdMDB(cid)
    let mapCart = cart.products.map(pdc => pdc)
    console.log(mapCart)

    if(cart) {
      res.render("viewcart", {cartView: mapCart})
    }else {
      res.status(404).send("None cart")
    }
  } catch (error) {
    res.status(500).send("Interval server error" + error)
  }
})


router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/messages", async (req, res) => {
  try {
    let getMessages = await msManager.getMessage();
    res.render("messages", { messages: getMessages.map(msg => msg.toJSON()) });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});


export default router;
