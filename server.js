const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// Configuración de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Manejo de eventos de Socket.IO
io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('selectButaca', (data) => {
    io.emit('butacaSelected', data);
  });
  // Escuchar cambios en el estado de las butacas
  socket.on('newComment', (data) => {
    io.emit('commentAdded', data);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
