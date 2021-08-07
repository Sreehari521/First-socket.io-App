var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/public/board.html");
})

app.get("/admin",(req,res) => {
    res.sendFile(__dirname+"/public/admin.html");
})

io.on("connection",(socket)=>{
    console.log("new connection established");

    socket.on("disconnect",()=>{
        console.log("connection closed");
    })
    
    socket.on("message",(msg)=>{
        console.log(msg);
        io.emit('board_content',msg)
    });
})

http.listen(1500, () => {
    console.log("Connected to the server!")
})