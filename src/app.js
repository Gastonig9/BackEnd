import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";

import productsRouter from "../routes/products-route.js";
import cartRouter from "../routes/carts-route.js";
import messageRouter from "../routes/messages-route.js"
import sessionRouter from "../routes/session-route.js"
import viewsRouter from "../routes/views.router.js";

import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import { ProductManager } from "./dao/modelsFileSystem/ProductManager.js";


const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Servidor funcionando correctamente");
});

export const socketServer = new Server(httpServer);
const mongoPass = "ricksanchez99"
const MONGO_URL = `mongodb+srv://gastonig9:${mongoPass}@cluster0.iutoww6.mongodb.net/`

const connection = mongoose.connect(MONGO_URL).then(conn => {
  console.log("Connection with Mongo Atlas established")
}).catch(err => {
  console.log("Connection failed")
})

app.engine("hbs", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'coderhouse', 
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URL
    })
  })
);

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", messageRouter)
app.use("/api/sessions", sessionRouter)

socketServer.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);

  socket.on('message', (data) => {
    console.log(data)
  })
});
