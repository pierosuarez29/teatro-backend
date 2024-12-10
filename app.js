const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./utils/dbConnection");

// Cargar variables de entorno
dotenv.config();

// Inicializar la app
const app = express();
dbConnection(); // Conexión a MongoDB

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/notifications", notificationRoutes);

module.exports = app;
