const express = require("express");
const { createReservation, getUserReservations } = require("../controllers/reservationController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createReservation);
router.get("/", verifyToken, getUserReservations);

module.exports = router;
