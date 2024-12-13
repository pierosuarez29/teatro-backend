const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de tener el modelo de usuario

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Asegurarse de obtener el token correctamente

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añadir la información del usuario a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
  }
};
