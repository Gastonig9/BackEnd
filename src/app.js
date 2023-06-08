import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "../routes/products-route.js";
import cartRouter from "../routes/carts-route.js";
import viewsRouter from "../routes/views.router.js";
import { Server } from "socket.io";
import { ProductManager } from "../src/ProductManager.js";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Servidor funcionando correctamente");
});

export const socketServer = new Server(httpServer);

app.engine("hbs", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);





// socketServer.on("connection", (socket) => {
//   console.log("Usuario conectado", socket.id);

//   socket.on('message', (data) => {
//     console.log(data)
//   })

//   socket.on('addProduct', (product) => {
//     console.log(product.title);

//   });
// });
