import cartModel from "../schemas/cart.schema.js";

export default class CartManagerMdb {
  constructor() {
    this.cartModel = cartModel;
  }

  async addCartMDB() {
    try {
      const newCart = await this.cartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error("Could not add cart");
    }
  }

  async getProductsCartMDB() {
    try {
      const carts = await this.cartModel.find().populate("products.product");
      return carts;
    } catch (error) {
        throw new Error("Could not get carts" + error);
    }
  }

  async getProductsCartIdMDB(id) {
    try {
        const findCart = await this.cartModel.findById(id)
        if(findCart) {
            return findCart
        }else{
            return "Not Found";
        }
    }catch (error) {
        throw new Error("Could not get cart");
    }
  }

  async addProductsCartMDB(cartID, prodID) {
    try {
      const cart = await this.cartModel.findById(cartID);
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      const existingProductIndex = cart.products.findIndex((prod) => prod.product === prodID);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        const newProduct = { product: prodID, quantity: 1 };
        cart.products.push(newProduct);
      }
  
      await cart.save();
      return true;
    } catch (error) {
      throw new Error("Could not add products to cart: " + error);
    }
  }

  async emptyCart(cartID) {
    try {
      const cart = await this.cartModel.findById({_id: cartID})

      if(cart) {
        cart.products = []
        await cart.save()
        return "Cart empty"
      }else {
        throw new Error("Cart not found")
      }
    } catch (error) {
      throw new Error("Could not empty cart")
    }
  }

  async deleteProductInCartMDB(cartID, prodID) { 
    try {
      const cart = await this.cartModel.findById(cartID)
  
      if (!cart) {
        throw new Error("Cart not found")
      }
    
      const findProductIndex = cart.products.findIndex(prod => prod.id === prodID)
      if (findProductIndex === -1) {
        throw new Error("Product not found")
      }
    
      cart.products.splice(findProductIndex, 1)
      await cart.save()
    
      return true
    } catch (error) {
      throw new Error("Could not delete")
    }

  }

  async updateQuantity(cartID, prodID, quantityChange) {
    const cart = await this.cartModel.findById(cartID);
  
    if (!cart) {
      throw new Error("Cart not found");
    }
  
    const product = cart.products.find((prod) => prod.id === prodID);
  
    if (product) {
      product.quantity = quantityChange;
      await cart.save();
    } else {
      throw new Error("Product not found");
    }
  }

  async updateCart(cartID, updatedProducts) {
    try {
      const cart = await this.cartModel.findById(cartID);
  
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      cart.products = updatedProducts;
  
      await cart.save();
      return true;
    } catch (error) {
      throw new Error("Could not update cart: " + error);
    }
  }
  
  
}



