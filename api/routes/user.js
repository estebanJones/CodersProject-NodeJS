const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const usersController = require("../controller/userController");

// login
router.post("/login", usersController.login)

// LOGOUT
router.post("/logout", checkAuth, usersController.logout)

// Create user
router.post("/newUser", usersController.createUser)

// Update user
router.patch("/edit/profile", checkAuth, usersController.updateUser)

// Remove user
router.delete("/delete", checkAuth, usersController.deleteUser)

// SHOW ONE
router.post("/show/one", checkAuth, usersController.showOneUser)

// SHOW ALL
router.post("/show/all", checkAuth, usersController.showAllUsers)


module.exports = router;
