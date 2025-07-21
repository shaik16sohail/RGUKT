const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const Message = require('./src/models/Message');
const server=http.createServer(app);
const io=new Server(server,{
  cors:{
    origin:'*',
    methods:['GET','POST'],
  }
});
app.set("io", io);
io.on('connection',(socket)=>{
    console.log("New client connection");

    socket.on('joinRoom',(hostelName)=>{
        socket.join(hostelName);
        console.log(`Joined hostel ${hostelName}`);
    });

    socket.on('sendMessage',async({hostelName,senderName,message,isImage,imageUrl})=>{
        const newMsg=await Message.create({hostelName,senderName,message,isImage,imageUrl});
        io.to(hostelName).emit('receiveMessage',newMsg);
    });
    socket.on('disconnect',()=>{
        console.log("A User Disconnected");
    });
});

server.listen(8080,()=>{
    console.log(`Server is listening at 8080`);
});