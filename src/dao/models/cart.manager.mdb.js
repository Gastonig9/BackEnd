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
      const carts = await this.cartModel.find();
      return carts;
    } catch (error) {
        throw new Error("Could not get carts");
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
  
  
}
