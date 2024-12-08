const express = require("express");
const userController = require("../controllers/user_controller");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

// Register route
router.post("/register", userController.registerUser);

// Login route
router.post("/login", userController.loginUser);

// Logout route
router.get("/logout", userController.logoutUser);

// Express route for checking the session
router.get("/session", userController.checkSession);

router.put("/edit", verifyToken, userController.ResetPassword);

module.exports = router;
