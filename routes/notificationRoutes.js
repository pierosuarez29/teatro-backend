const express = require("express");
const { createNotification, getNotifications } = require("../controllers/notificationController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { attachSocketIo } = require("../middlewares/socketMiddleware");

const router = express.Router();

module.exports = (io) => {
  router.post("/", verifyToken, attachSocketIo(io), createNotification);
  router.get("/", verifyToken, getNotifications);

  return router;
};
