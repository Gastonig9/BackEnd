import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.products = [];
    this.id = 1;
    this.path = path;
    this.loadProducts()
  }

  addProduct(
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails,
    code
  ) {
    if (
      title &&
      description &&
      price &&
      status &&
      stock &&
      category &&
      thumbnails &&
      code
    ) {
      const verificationCode = this.products.some(
        (product) => product.code === code
      );
      if (verificationCode) {
        throw new Error("repeated code");
      } else {
        let id = this.id++;
        const newProduct = {
          id,
          title: String(title),
          description: String(description),
          price: Number(price),
          status: Boolean(status),
          stock: Number(stock),
          category: String(category),
          thumbnails: Array.isArray(thumbnails) ? thumbnails : [],
          code: String(code),
        };
        this.products.push(newProduct);
      }
    } else {
      throw new Error("You have not completed all the fields");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return null;
    }
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }

  updateProduct(id, newObject) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      return null;
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...newObject,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productId = parseInt(id);
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Product Not Found");
    }
    return product;
  }

  archivarProds() {
    const jsonData = JSON.stringify(this.products);
    fs.writeFile(this.path, jsonData, "utf-8", (error) => {
      if (error) {
        throw new Error("Products could not be archived" + error);
      } else {
        return "Data archived successfully";
      }
    });
  }

  loadProducts() {
    if (fs.existsSync(this.path)) {
      const jsonData = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(jsonData);
    } else {
      this.archivarProds();
    }
  }
}
