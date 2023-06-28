const socket = io()

let $productsList = document.getElementById("product-list")

socket.on('addProducts', (products) => {
    console.log(products)
    $productsList.innerHTML = "";
    products.forEach((product) => {
      const title = product.title;
      const pElement = document.createElement("p");
      pElement.textContent = title;
      $productsList.appendChild(pElement);
    });
});
  

// let productsContain = document.getElementById("products")
// // let send = document.getElementById("send")
// // let $title = document.getElementById("title")
// // let $description = document.getElementById("description")
// // let $price = document.getElementById("price")
// // let $stock = document.getElementById("stock")
// // let $category = document.getElementById("category")
// // let $code = document.getElementById("code")

// // let newProduct = { 
// //     title: $title.value,
// //     description: $description.value,
// //     price: $price.value,
// //     stock: $stock.value,
// //     category: $category.value,
// //     code: $code.value 
// // };