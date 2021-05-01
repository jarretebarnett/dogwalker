const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const socket = require('../config/connection');

Socket.io("chat-message", data => {
    console.log(data)
});

messageForm.addEventListener("submit", event => {
    event.preventDefault()
    const message = messageInput.value
    socket.emit("send-chat-message", message)
    messageInput.value = ""
})