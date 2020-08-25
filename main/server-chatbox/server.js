var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var admin = 'admin' ;


app.get('/', (req, res) => res.send("hello"));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        msge = msg   ;
        socket.broadcast.emit('message-broadcast', msg);
    });

    socket.on('guest', (guest) =>{
        socket.emit('guest-id',guest);
        console.log(guest + ' duoc jont vao rom !!!') ;

    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

