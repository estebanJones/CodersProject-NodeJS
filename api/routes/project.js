const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const projectController = require("../controller/projectController");


// Create project
router.post("/create_task", checkAuth, projectController.createProject)

// Update project
router.patch("/update_project", checkAuth, projectController.updateProject)

// Remove project
router.delete("/delete_project", checkAuth, projectController.deleteProject)

// SHOW ONE PROJECT
router.post("/show_one_task", checkAuth, projectController.showOneProject)

// SHOW ALL PROJECT
router.post("/show_all_project", checkAuth, projectController.showAllProject)

module.exports = router;
