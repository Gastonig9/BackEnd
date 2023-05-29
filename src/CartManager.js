import fs from "fs";
export class CartManager {
  constructor(path) {
    this.path = path;
    this.cart = [];
    this.id = 1;
  }

  addCart() {
    let id = this.id++;
    const newProductCar = {
      id,
      products: [],
    };
    this.cart.push(newProductCar);
    this.saveCartInJson();
  }

  getProductsCart() {
    return this.cart;
  }

  getProductsCartId(id) {
    const cartId = this.cart.find((cart) => cart.id === id);
    if (!cartId) {
      return "Not Found";
    } else {
      return cartId.products;
    }
  }

  addProductsCart(cartID, prodID) {
    const cart = this.getProductsCartId(cartID);

    let found = false;
    let quantity = 1;

    cart.map((prod) => {
      if (prod.product === prodID) {
        found = true;
        return {
          ...prod,
          quantity: ++prod.quantity,
        };
      }
    });

    if (!found) {
      const newProd = {
        product: prodID,
        quantity: quantity,
      };
      cart.push(newProd);
    }
    this.updateProductInCart(prodID);
    return true;
  }

  saveCartInJson() {
    const cartToSave = JSON.stringify(this.cart);
    fs.writeFile(this.path, cartToSave, "utf-8", (error) => {
      if (error) {
        return "Error";
      } else {
        return "Save data!";
      }
    });
  }

  updateProductInCart(prodID) {
    const cartToUpdate = this.cart.find(cart => cart.products.some(prod => prod.product === prodID));
        if (cartToUpdate) {
            const updatedCart = cartToUpdate.products.map(prod => {
                if (prod.product === prodID) {
                    return {
                        ...prod,
                        quantity: prod.quantity + 1
                    };
                }
                return prod;
            });
            cartToUpdate.products = updatedCart;
            return this.saveCartInJson();
        }
        return Promise.reject("Cart not found");
  }
}


