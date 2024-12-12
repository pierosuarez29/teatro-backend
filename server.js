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

// Estado inicial de las butacas
const rows = ["A", "B", "C", "D", "E"];
const cols = 10; // Número de columnas por fila
const seats = rows.flatMap((row) => Array.from({ length: cols }, (_, i) => ({ id: `${row}${i + 1}`, occupied: false })));

// Manejo de eventos de Socket.IO
io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Enviar el estado actual de las butacas al cliente
  socket.emit("updateSeats", seats);

  // Escuchar cambios en el estado de las butacas
  socket.on("toggleSeat", (seatId) => {
    const seatIndex = seats.findIndex((seat) => seat.id === seatId);
    if (seatIndex !== -1) {
      seats[seatIndex].occupied = !seats[seatIndex].occupied;
      io.emit("updateSeats", seats); // Notificar a todos los clientes
    }
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
