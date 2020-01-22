const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const usersController = require("../controller/userController");

// login
router.post("/login", usersController.login)

// LOGOUT
router.post("/logout", usersController.logout)

// Create user
router.post("/newUser", usersController.createUser)

// Update user
router.patch("/update", usersController.updateUser)

// Remove user
router.post("/delete", usersController.deleteUser)

// SHOW ONE
router.post("/show/one", usersController.showOneUser)

// SHOW ALL
router.post("/show_all", usersController.showAllUsers)



module.exports = router;
