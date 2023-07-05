import { Router } from "express";
// import { CartManager } from "../src/CartManager.js";
import CartManagerMdb from "../src/dao/models/cart.manager.mdb.js";

const router = Router();
const cManagerMdb = new CartManagerMdb();

router.post("/", async (req, res) => {
  try {
    const createCart = await cManagerMdb.addCartMDB();

    if (createCart) {
      res.status(200).send("Cart created");
    } else {
      res.status(400).send("Failed to create cart");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    let cart = await cManagerMdb.getProductsCartMDB();

    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Fail to get the carts");
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    let id = req.params.cid;
    let cartId = await cManagerMdb.getProductsCartIdMDB(id);

    if (cartId) {
      res.status(200).send(cartId);
    } else {
      res.status(404).send("Fail to get the requested cart");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cID = req.params.cid;
    const pID = req.params.pid;
    const productToCart = await cManagerMdb.addProductsCartMDB(cID, pID)

    if (productToCart) {
      res.send("Product added to cart");
    } else if (cID === undefined) {
      res.status(404).send("Fail to get the requested cart");
    } else if (pID === undefined) {
      res.status(404).send("Fail to get the requested product in the cart");
    } else {
      res.status(404).send("Fail to get the requested cart and product");
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cartID = req.params.cid;
    const updatedProducts = req.body.products;

    const updateCart = await cManagerMdb.updateCart(cartID, updatedProducts);

    if (updateCart) {
      res.status(200).send("Cart updated successfully");
    } else {
      res.status(404).send("Cart not found or could not be updated");
    }
  } catch (error) {
    res.status(500).send("Internal server error: " + error);
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const cID = req.params.cid;
    const pID = req.params.pid;
    const { quantity } = req.body;
    
    const updateQuantity = await cManagerMdb.updateQuantity(cID, pID, quantity);

    if (updateQuantity) {
      res.status(200).send("Product updated successfully");
    } else {
      res.status(404).send("Product not found or could not be updated");
    }
  } catch (error) {
    res.status(500).send("Internal server error: " + error);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    let cID = req.params.cid;
    let emptyCart = await cManagerMdb.emptyCart(cID)

    if(emptyCart) {
      res.status(200).send("Cart empty!")
    }else{
      res.status(404).send("None cart")
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }



})

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cID = req.params.cid;
    const pID = req.params.pid;
  
    const deleteProductInCart = await cManagerMdb.deleteProductInCartMDB(cID, pID)
    if(deleteProductInCart) {
      res.status(200).send("Product deleted")
    }else{
      res.status(404).send("None product")
    }
  } catch (error) {
    res.status(500).send("Interval server error")
  }

})


export default router;

//with file system
// const cManager = new CartManager("../carts.json");
// router.post("/", (req, res) => {
//   let createCart = cManager.addCart();

//   if (createCart) {
//     return res.send("Cart created");
//   } else {
//     return res.status(400).send("An error occurred");
//   }
// });

// router.get("/", (req, res) => {
//   const cart = cManager.getProductsCart();

//   if (cart) {
//     return res.send(cart);
//   } else {
//     return res.status(400).send("Could not get the information");
//   }
// });

// router.get("/:cid", (req, res) => {
//   const id = parseInt(req.params.cid);
//   const cartId = cManager.getProductsCartId(id);

//   if (cartId) {
//     return res.send(cartId);
//   }else{
//     return res.status(400).send("Could not get the id");
//   }
// });

// router.post("/:cid/product/:pid", (req, res) => {
//   const cID = parseInt(req.params.cid);
//   const pID = parseInt(req.params.pid);
//   const productToCart = cManager.addProductsCart(cID, pID);

//   if (productToCart) {
//     return res.send("Product added to cart");
//   } else {
//     return res.status(404).send("Error");
//   }
// });
