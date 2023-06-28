import productModel from "../schemas/product.schema.js";

export default class ProductManagerMdb {
  constructor() {
    this.id = 1;
    this.productModel = productModel;
  }

  async getProductsMDB() {
    try {
      const allProducts = await this.productModel.find();
      return allProducts;
    } catch (error) {
      throw new Error("Could not get the products");
    }
  }

  async getProductsByIdMDB(pid) {
    try {
        const getProduct = await this.productModel.findOne({_id: pid})
        return getProduct;
    } catch (error) {
        throw new Error("Could not get the product")
    }
  }

  async addProductMDB(pd) {
    try {
      const addProduct = await this.productModel.create(pd);
      return addProduct;
    } catch (error) {
      throw new Error("Could not add product");
    }
  }

  async deleteProductMDB(pid) {
    try {
      const deleteProduct = await this.productModel.deleteOne({ _id: pid });
      return deleteProduct;
    } catch (error) {
      throw new Error("Could not delete product");
    }
  }

  async updateProductMDB(obj, pid) {
    try {
        const updateProduct = await this.productModel.updateOne({_id: pid}, obj)
        return updateProduct;
    } catch (error) {
        throw new Error("Could not update product")
    }
  }
}
