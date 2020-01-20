const express = require("express");

const router = express.router();
const checkAuth = require("../middlewares/check-auth");
const usersController = require("../controller/userController");

// login
router.post("/login")

// LOGOUT
router.post("/logout")

// Create user
router.post("/api/user/new")

// Update user
router.patch("/api/user/edit/profile", checkAuth)

// Remove user
router.delete("/api/user/delete", checkAuth)

// SHOW ONE
router.post("api/user/show/one")

// SHOW ALL
router.post("api/user/show/all", usersController.showAll)


module.exports = router;
