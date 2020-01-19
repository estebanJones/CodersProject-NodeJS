const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const projectController = require("../controller/projectController");


// Create project
router.post("/create_project", projectController.createProject)

// Update project
router.patch("/update_project", projectController.updateProject)

// Remove project
router.post("/delete_project", projectController.deleteProject)

// SHOW ONE PROJECT
router.post("/show_one_project", projectController.showOneProject)

// SHOW ALL PROJECT
router.post("/show_all_project", projectController.showAllProject)

module.exports = router;
