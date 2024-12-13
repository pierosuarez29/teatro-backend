const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./utils/dbConnection");
const morgan = require("morgan");

// Inicializar la app
const app = express();
app.use(morgan("dev"));

// Cargar variables de entorno
dotenv.config();
dbConnection(); // Conexión a MongoDB

// Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend de Next.js
}));

// Ruta de prueba
app.get("/api/nueva", async (req, res) => {
    res.send("hola");
});

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/presentaciones', require('./routes/presentacionRoutes'));
app.use('/api/butacas', require('./routes/butacaRoutes'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/comentarios', require('./routes/comentarioRoutes'));

module.exports = app;
