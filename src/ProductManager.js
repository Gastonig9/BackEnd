import fs from "fs";

export class ProductManager {
    constructor(path) {
        this.products = [];
        this.id = 1;
        this.path = path;
    }

    addProduct(title, description, price, status, stock, category, thumbnails, code) {
        if (title && description && price && status && stock && category && thumbnails && code) {
          const verificationCode = this.products.some(product => product.code === code);
          if (verificationCode) {
            console.error("ERROR: El código está repetido");
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
              code: String(code)
            };
            this.products.push(newProduct);
          }
        } else {
          console.error("ERROR: Debe completar todos los campos");
        }
    }
      
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {;
            return null;
        }
        const deletedProduct = this.products.splice(index, 1);
        return deletedProduct;
    }

    updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
          return null;
        }
        const updatedProduct = {
          ...this.products[productIndex],
          ...newObject
        };
        this.products[productIndex] = updatedProduct;
        console.log("Producto actualizado correctamente");
        return updatedProduct;
      }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const productId = parseInt(id);
        const product = this.products.find(product => product.id === productId);
        if (!product) {
            console.error("No se encontró el producto");
        }
        return product;
    }

    archivarProds() {
        const jsonData = JSON.stringify(this.products);
        fs.writeFile(this.path, jsonData, "utf-8", (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Datos archivados correctamente");
          }
        });
      } 
}



// pManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
// pManager.addProduct("Arroz", "con atún", 20, "url", 124, 25);
// pManager.addProduct("Milanesas", "con puré", 20, "url", 125, 25);
// pManager.addProduct("Hamburguesa", "con queso", 20, "url", 126, 25);
// pManager.addProduct("fideos", "con queso", 20, "url", 127, 25);
// pManager.addProduct("fideos", "con queso", 20, "url", 128, 25);
// pManager.updateProduct(4, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 });
// pManager.archivarProds();