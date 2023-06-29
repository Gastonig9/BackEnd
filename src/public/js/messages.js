const socket = io();
const $newMessage = document.getElementById("newMessage");

socket.on('getMessage', msg => {
  const messageElement = document.createElement('li');
  const messageElement2 = document.createElement('hr');
  messageElement.textContent = msg;

  $newMessage.appendChild(messageElement);
  $newMessage.appendChild(messageElement2);
});
