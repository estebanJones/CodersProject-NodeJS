const express = require("express");

const router = express.router();
const checkAuth = require("../middlewares/check-auth");
const projectController = require("../controller/projectController");


// Create project
router.post("/user/create_task", checkAuth, projectController.createTask)

// Update project
router.patch("/user/update_project", checkAuth, projectController.updateTask)

// Remove project
router.delete("/user/delete_project", checkAuth, projectController.deleteProject)

// SHOW ONE PROJECT
router.post("/user/show_one_task", checkAuth, projectController.showOneProject)

// SHOW ALL PROJECT
router.post("/user/show_all_project", checkAuth, projectController.showAllProject)

module.exports = router;
