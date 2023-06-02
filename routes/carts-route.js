import { Router } from "express";
import { CartManager } from "../src/CartManager.js";

const router = Router();
const cManager = new CartManager("../carts.json");

router.post("/", (req, res) => {
  let createCart = cManager.addCart();

  if (createCart) {
    return res.send("Cart created");
  } else {
    return res.status(400).send("An error occurred");
  }
});

router.get("/", (req, res) => {
  const cart = cManager.getProductsCart();

  if (cart) {
    return res.send(cart);
  } else {
    return res.status(400).send("Could not get the information");
  }
});

router.get("/:cid", (req, res) => {
  const id = parseInt(req.params.cid);
  const cartId = cManager.getProductsCartId(id);

  if (cartId) {
    return res.send(cartId);
  }else{
    return res.status(400).send("Could not get the id");
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const cID = parseInt(req.params.cid);
  const pID = parseInt(req.params.pid);
  const productToCart = cManager.addProductsCart(cID, pID);

  if (productToCart) {
    return res.send("Product added to cart");
  } else {
    return res.status(404).send("Error");
  }
});

export default router;
