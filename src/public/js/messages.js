const socket = io();

console.log(socket);

socket.on("getMessage", (msg) => {
  console.log("entro");
  let data = msg;
  console.log(data);
});
