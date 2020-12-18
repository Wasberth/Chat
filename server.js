const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

const maxMessages = 40;
const initialMessage = {
    text: "Este es mi chat en Node.js. Con fin de optimizar el envío de mensajes, el máximo aceptado es " + maxMessages + " y una vez llegado ese límite los primeros mensajes serán eliminados.",
    author: "Wilberth Piña"
};

app.use(express.static('public'));

var messages = [initialMessage];

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function(data) {
        if (data.author != "" && data.text != "") {
            while (messages.length >= maxMessages) {
                messages.shift();
            }
            data.text = data.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            messages.push(data);

            io.sockets.emit('messages', messages);
        }
    });
});

server.listen(port, function() {
    console.log(`Servidor corriendo en ${port}`);
});