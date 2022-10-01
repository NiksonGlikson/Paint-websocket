const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
//получим объект с помощью которого будет делать широковещательную
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
    //логика обработки и отправки сообщений
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch(msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break;
            case 'draw':
                broadcastConnection(ws, msg)
                break;
        }
    })
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    //функция которая будет делать широковещательную рассылку
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}