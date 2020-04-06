const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const taskController = require("../controller/taskController");


// Create task
router.post("/create_task/", taskController.createTask)

// Update task
router.patch("/update_task", taskController.updateTask)

// Remove task
router.delete("/delete_task", taskController.deleteTask)

// SHOW ONE TASK
router.post("/show_one_task", taskController.showOneTask)

// SHOW ALL TASKS
router.post("/show/all", taskController.showAllTasks)

// ATTRIBUT TASK
//router.post("/dev/attribut_task")


module.exports = router;
