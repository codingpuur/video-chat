const { Server } = require("socket.io");
const express = require("express")
const cors = require("cors")
const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

app.get('/',(req,res)=>{
  res.send('Hello, World!');
})

const server = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

// Initialize WebSocket server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "*", // You might want to restrict this to specific origins
    methods: ["GET", "POST"]
  }
});

// const io = new Server(port, {
//   cors: true,
// });

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

// app.listen(port,()=>console.log("server on port 8000"))