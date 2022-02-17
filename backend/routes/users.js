const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.post("/api/users", usersController.createUser);
router.post("/api/users/login", usersController.loginUser);
router.get("/api/users/me", usersController.getUser);

module.exports = router;
