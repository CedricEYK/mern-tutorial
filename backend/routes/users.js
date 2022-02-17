const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { protect } = require("../middleware/authHandler");

router.post("/api/users", usersController.createUser);
router.post("/api/users/login", usersController.loginUser);
router.get("/api/users/me", protect, usersController.getUser);

module.exports = router;
