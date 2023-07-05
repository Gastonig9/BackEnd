import productModel from "../schemas/product.schema.js";

export default class ProductManagerMdb {
  constructor() {
    this.id = 1;
    this.productModel = productModel;
  }

  async getProductsMDB(limit, page, sort, query) {
    try {
      const allProducts = await this.productModel.paginate(
        {query},
        {
          limit: limit || 4,
          page: page || 1,
          sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined
        }
      )
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
