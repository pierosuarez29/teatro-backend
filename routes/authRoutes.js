const express = require("express");
const { register, login, getUsers, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/logout", logout);

module.exports = router;
