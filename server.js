const express=require("express");
const nodemon = require("nodemon");

const app= express();
const http=require("http").createServer(app);

const PORT=process.env.PORT || 3000;
app.use(express.static("./public"));


http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static('./public'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'public','index.html'));
    })
}

//socket
const io =require("socket.io")(http);

io.on('connection',(socket)=>{
    console.log('Connected...');

    socket.on('message',(msg)=>{
      socket.broadcast.emit('message',msg);
    })



});


