const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.on('connection',socket =>{
    socket.on('Calculate',()=>{
        socket.emit('doit');  
    });
})
http.listen(5000,function (){
    console.log("Server listening on port 5000")
})