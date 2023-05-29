import { Router } from "express";
import { CartManager } from "../src/CartManager.js";

const router = Router();
const cManager = new CartManager("../carts.json")

router.post('/', (req, res)=> {
    cManager.addCart()
    res.send("Cart created")
})

router.get('/', (req, res)=> {
    const cart = cManager.getProductsCart()
    res.send(cart)
})

router.get('/:cid', (req, res) => {
    const id = parseInt(req.params.cid);
    const cartId = cManager.getProductsCartId(id)
    res.send(cartId)
})

router.post('/:cid/product/:pid', (req, res) => {
    const cID = parseInt(req.params.cid);
    const pID = parseInt(req.params.pid);
    const productToCart = cManager.addProductsCart(cID, pID);

    if (productToCart) {
        res.send("Product added to cart");
    } else {
        res.status(404).send("Error");
    }
});


export default router;