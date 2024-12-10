const express = require("express");
const { createEvent, getEvents, getEventById } = require("../controllers/eventController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);

module.exports = router;
